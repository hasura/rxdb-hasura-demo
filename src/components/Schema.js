export const todoSchema  = {
    'title': 'todo schema',
    'description': 'todo schema',
    'version': 0,
    'type': 'object',
    'properties': {
        'id': {
            'type': 'string',
            'primary': true
        },
        'text': {
            'type': 'string'
        },
        'isCompleted': {
            'type': 'boolean'
        },
        'createdAt': {
            'type': 'string',
            'format': 'date-time',
            'index': true,        
        },
        'updatedAt': {
            'type': 'string',
            'format': 'date-time'
        },
        'userId': {
            'type': 'string'
        },
    },
    'required': ['text', 'isCompleted', 'userId', 'createdAt'],
    additionalProperties: true
};
