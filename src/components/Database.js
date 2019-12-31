import RxDB from 'rxdb';

import { todoSchema } from './Schema';

import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import RxDBValidateModule from 'rxdb/plugins/validate';

RxDB.plugin(RxDBSchemaCheckModule);
RxDB.plugin(RxDBErrorMessagesModule);
RxDB.plugin(RxDBValidateModule);

RxDB.plugin(require('pouchdb-adapter-idb'));

export const createDb = async () => {
    console.log('DatabaseService: creating database..');

    const db = await RxDB.create({
        name: 'tododb',
        adapter: 'idb',
        password: '|8S_~|nC1>Vf&-9',
        queryChangeDetection: true
    });

    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging

    await db.collection({
        name: 'todos',
        schema: todoSchema
     })

    return db;
};