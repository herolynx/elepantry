package com.herolynx.pulpfile.model

/**
 * Resource perspective based on chosen tags
 *
 * @author Michal Wronski
 */
data class View(
        val id: String,
        val name: String,
        val must: List<Tag>,
        val could: List<Tag>
)
