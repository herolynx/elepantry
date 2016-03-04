package com.herolynx.pulpfile.io.repository

import com.herolynx.pulpfile.model.Resource
import com.herolynx.pulpfile.model.View
import rx.Observable

/**
 * View repository
 *
 * @author Michal Wronski
 */
interface ViewRepository {

    fun get(view: View): Observable<Resource>

}