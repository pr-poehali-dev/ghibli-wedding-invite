import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage wedding wishes from guests
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if method == 'GET':
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("SELECT id, guest_name, wish_text, created_at FROM wishes ORDER BY created_at DESC")
        wishes = cur.fetchall()
        
        cur.close()
        conn.close()
        
        wishes_list = []
        for wish in wishes:
            wishes_list.append({
                'id': wish['id'],
                'guest_name': wish['guest_name'],
                'wish_text': wish['wish_text'],
                'created_at': wish['created_at'].isoformat() if wish['created_at'] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'wishes': wishes_list})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        guest_name = body_data.get('guest_name', '').strip()
        wish_text = body_data.get('wish_text', '').strip()
        
        if not guest_name or not wish_text:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'guest_name and wish_text are required'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO wishes (guest_name, wish_text) VALUES (%s, %s) RETURNING id",
            (guest_name, wish_text)
        )
        wish_id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'id': wish_id, 'message': 'Wish added successfully'})
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
