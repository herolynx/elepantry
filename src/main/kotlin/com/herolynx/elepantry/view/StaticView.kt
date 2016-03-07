package com.herolynx.elepantry.view

import com.herolynx.elepantry.func.collections.toMap
import com.herolynx.elepantry.func.model.option.getOrElse
import com.herolynx.elepantry.func.model.either.toBoolean
import com.herolynx.elepantry.func.model.option.toOption
import com.herolynx.elepantry.io.repository.ResourceRepository
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
    private val resourceRepository: ResourceRepository
    private val view: TaggedView

    constructor(view: TaggedView, viewRepository: ViewRepository, resourceRepository: ResourceRepository, storages: List<Storage>) {
        this.view = view
        this.viewRepository = viewRepository
        this.resourceRepository = resourceRepository
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
                            .map { storage ->
                                storage.exists(resource)
                                        .right().map { exists ->
                                    resourceRepository.delete(resource.id)
                                    exists
                                }.toBoolean()
                            }
                            .getOrElse { false }
                }
    }


}