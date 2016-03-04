package com.herolynx.pulpfile.io.repository

import com.herolynx.pulpfile.model.Resource
import com.herolynx.pulpfile.model.View
import rx.Observable

/**
 * View created based on some tagged resources
 *
 * @author Michal Wronski
 */
interface ResourceView {

    fun get(view: View): Observable<Resource>

}