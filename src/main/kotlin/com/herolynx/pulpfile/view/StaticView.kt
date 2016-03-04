package com.herolynx.pulpfile.view

import com.herolynx.pulpfile.io.repository.ViewRepository
import com.herolynx.pulpfile.io.storage.Storage
import com.herolynx.pulpfile.model.Resource
import com.herolynx.pulpfile.model.ResourceType
import com.herolynx.pulpfile.model.View
import com.herolynx.pulpfile.utils.toBoolean
import com.herolynx.pulpfile.utils.toMap
import org.funktionale.either.Either
import rx.Observable
import java.io.File
import org.funktionale.option.OptionKt.toOption

/**
 * View created based on tagger repositories
 *
 * @author Michal Wronski
 */
final class StaticView : ViewAccess {

    private val storageMap: Map<ResourceType, Storage>
    private val viewRepository: ViewRepository
    private val view: View

    constructor(view: View, viewRepository: ViewRepository, storages: List<Storage>) {
        this.view = view
        this.viewRepository = viewRepository
        this.storageMap = storages.toMap { storage -> storage.getType() }
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
                    toOption(storageMap.get(resource.type))
                            .map { storage -> storage!!.exists(resource).toBoolean() }
                            .get()
                }
    }

    override fun download(id: String): Either<Exception, File?> {
        throw UnsupportedOperationException()
    }

    override fun upload(f: File): Either<Exception, Boolean> {
        throw UnsupportedOperationException()
    }
}