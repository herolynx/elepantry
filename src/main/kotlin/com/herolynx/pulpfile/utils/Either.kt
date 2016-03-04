package com.herolynx.pulpfile.utils

import org.funktionale.either.Either

fun <L> Either<L, Boolean>.toBoolean(): Boolean {
    return isRight && right().toOption().get() == true
}

