import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    map,
    exhaustMap,
} from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import * as CategoryActions from '../actions/category.actions';
import { CategoryNode } from '@shared/models/database';

const COLLECTION_NAME = 'categories';

@Injectable()
export class CategoryEffects {
    categoryCollection: AngularFirestoreCollection<CategoryNode>;
    categories$: Observable<CategoryNode[]>;

    @Effect()
    Create$: Observable<Action> = this.actions$.pipe(
        ofType<CategoryActions.Create>(CategoryActions.ActionTypes.Create),
        map(action => action.payload),
        exhaustMap(category => {
            const id = this.afs.createId();
            this.categoryCollection.doc(id).set({ id, ...category });
            return this.categories$.pipe(
                map(categories => new CategoryActions.Complete(categories))
            );
        })
    );


    @Effect()
    Read$: Observable<Action> = this.actions$.pipe(
        ofType<CategoryActions.Read>(CategoryActions.ActionTypes.Read),
        exhaustMap(() => {
            return this.categories$.pipe(
                map(categories => new CategoryActions.Complete(categories))
            );
        })
    );

    @Effect()
    Update$: Observable<Action> = this.actions$.pipe(
        ofType<CategoryActions.Update>(CategoryActions.ActionTypes.Update),
        map(action => action.payload),
        exhaustMap(category => {
            const jsonObject = JSON.parse(JSON.stringify(category));
            console.log(jsonObject);

            this.categoryCollection.doc(category.id).update(jsonObject);
            return this.categories$.pipe(
                map(categories => new CategoryActions.Complete(categories))
            );
        })
    );

    constructor(
        private actions$: Actions,
        private readonly afs: AngularFirestore,
    ) {
        this.categoryCollection = this.afs.collection<CategoryNode>(COLLECTION_NAME);
        this.categories$ = this.categoryCollection.valueChanges();
    }
}
