package com.herolynx.barefoot.repository

import java.io.File

/**
 * @author Michal Wronski
 */
interface ResourceRepository {

    fun get(): List<File>



}