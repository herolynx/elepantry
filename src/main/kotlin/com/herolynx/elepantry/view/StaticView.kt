package com.herolynx.elepantry.view

import com.herolynx.elepantry.func.collections.toMap
import com.herolynx.elepantry.func.model.toBoolean
import com.herolynx.elepantry.func.model.toOption
import com.herolynx.elepantry.io.repository.ViewRepository
import com.herolynx.elepantry.io.storage.Storage
import com.herolynx.elepantry.model.Resource
import com.herolynx.elepantry.model.ResourceType
import com.herolynx.elepantry.model.TaggedView
import rx.Observable

/**
 * View created based on tagged resources
 *
 * @author Michal Wronski
 */
final class StaticView : View {

    private val storageMap: Map<ResourceType, Storage>
    private val viewRepository: ViewRepository
    private val view: TaggedView

    constructor(view: TaggedView, viewRepository: ViewRepository, storages: List<Storage>) {
        this.view = view
        this.viewRepository = viewRepository
        this.storageMap = storages.toMap { it.getType() }
    }

    /**
     * Get files belonging to storage
     *
     * @return resource stream
     */
    override fun get(): Observable<Resource> {
        return viewRepository
                .get(view)
                .filter { resource ->
                    storageMap.get(resource.type).toOption()
                            .map { storage -> storage.exists(resource).toBoolean() }
                            .get()
                }
    }


}