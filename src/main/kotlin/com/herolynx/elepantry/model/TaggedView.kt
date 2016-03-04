package com.herolynx.elepantry.model

/**
 * Resource perspective based on chosen tags
 *
 * @author Michal Wronski
 */
data class TaggedView(
        val id: String,
        val name: String,
        val must: List<Tag>,
        val could: List<Tag>
)
