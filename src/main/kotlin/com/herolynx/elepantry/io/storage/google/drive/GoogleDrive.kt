package com.herolynx.elepantry.io.storage.google.drive

import com.google.api.services.drive.Drive;

/**
 * Google drive manager
 *
 * @author Michal Wronski
 */
final class GoogleDrive {

    private val drive: Drive

    constructor(drive: Drive) {
        this.drive = drive
    }
}

