package com.herolynx.barefoot.model

/**
 * Any resource that can be tagged
 *
 * @author Michal Wronski
 */
data class Resource(
        val id: String,
        val name: String,
        val type: ResourceType,
        val url: String,
        val tags: List<Tag>
)
