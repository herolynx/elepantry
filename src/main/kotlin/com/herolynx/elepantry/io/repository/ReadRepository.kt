package com.herolynx.elepantry.io.repository

import rx.Observable

/**
 * Read-only access
 *
 * @author Michal Wronski
 */
interface ReadRepository<T> {

    fun get(): Observable<T>

    fun get(id: String): T?

}