import json
import os
import base64
import uuid
import psycopg2
import boto3
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для управления экспонатами музея: получение списка, загрузка и удаление 3D моделей'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        if method == 'GET':
            return get_exhibits(conn)
        elif method == 'POST':
            return create_exhibit(event, conn)
        elif method == 'DELETE':
            return delete_exhibit(event, conn)
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def get_exhibits(conn):
    '''Получение списка всех экспонатов'''
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, title, description, year, category, image_url, created_at 
        FROM exhibits 
        ORDER BY created_at DESC
    ''')
    
    exhibits = []
    for row in cursor.fetchall():
        exhibits.append({
            'id': row[0],
            'title': row[1],
            'description': row[2],
            'year': row[3],
            'category': row[4],
            'imageUrl': row[5],
            'createdAt': row[6].isoformat() if row[6] else None
        })
    
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'exhibits': exhibits}),
        'isBase64Encoded': False
    }

def create_exhibit(event: dict, conn):
    '''Создание нового экспоната с загрузкой изображения'''
    
    body = json.loads(event.get('body', '{}'))
    
    title = body.get('title', '').strip()
    description = body.get('description', '').strip()
    year = body.get('year', '').strip()
    category = body.get('category', '').strip()
    image_base64 = body.get('image', '')
    
    if not title or not image_base64:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Title and image are required'}),
            'isBase64Encoded': False
        }
    
    try:
        image_data = base64.b64decode(image_base64.split(',')[1] if ',' in image_base64 else image_base64)
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Invalid image data: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    
    file_extension = 'jpg'
    if image_base64.startswith('data:image/png'):
        file_extension = 'png'
    elif image_base64.startswith('data:image/webp'):
        file_extension = 'webp'
    
    file_key = f'exhibits/{uuid.uuid4()}.{file_extension}'
    
    try:
        s3.put_object(
            Bucket='files',
            Key=file_key,
            Body=image_data,
            ContentType=f'image/{file_extension}'
        )
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Failed to upload image: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_key}"
    
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO exhibits (title, description, year, category, image_url)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, created_at
    ''', (title, description, year, category, cdn_url))
    
    exhibit_id, created_at = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'id': exhibit_id,
            'title': title,
            'description': description,
            'year': year,
            'category': category,
            'imageUrl': cdn_url,
            'createdAt': created_at.isoformat() if created_at else None
        }),
        'isBase64Encoded': False
    }

def delete_exhibit(event: dict, conn):
    '''Удаление экспоната'''
    
    query_params = event.get('queryStringParameters', {}) or {}
    exhibit_id = query_params.get('id')
    
    if not exhibit_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Exhibit ID is required'}),
            'isBase64Encoded': False
        }
    
    cursor = conn.cursor()
    cursor.execute('DELETE FROM exhibits WHERE id = %s RETURNING id', (exhibit_id,))
    deleted = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    if not deleted:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Exhibit not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'message': 'Exhibit deleted successfully'}),
        'isBase64Encoded': False
    }
