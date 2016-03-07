package com.herolynx.elepantry.func.model.either

import com.herolynx.elepantry.func.model.either.Either.*
import com.herolynx.elepantry.func.model.option.Option
import com.herolynx.elepantry.func.model.option.Option.*
import java.util.*

final class RightProjection<out L, out R>(val e: Either<L, R>) {

    fun get(): R {
        return when (e) {
            is Right<L, R> -> e.r
            else -> throw NoSuchElementException("Either.right.value on Left")
        }
    }

    fun forEach(f: (R) -> Unit) {
        return when (e) {
            is Right<L, R> -> f(e.r)
            else -> {
            }
        }
    }


    fun exists(predicate: (R) -> Boolean): Boolean {
        return when (e) {
            is Right<L, R> -> predicate(e.r)
            else -> false
        }
    }

    fun<X> map(f: (R) -> X): Either<L, X> {
        return flatMap { Right<L, X>(f(it)) }
    }

    fun filter(predicate: (R) -> Boolean): Option<Either<L, R>> {
        return when (e) {
            is Right<L, R> -> {
                if (predicate(e.r)) {
                    Some(e)
                } else {
                    None
                }
            }
            else -> None
        }
    }

    fun toOption(): Option<R> {
        return when (e) {
            is Right<L, R> -> Some(e.r)
            else -> None
        }
    }

}

fun<L, R> RightProjection<L, R>.getOrElse(default: () -> R): R {
    return when (e) {
        is Right<L, R> -> e.r
        else -> default()
    }
}

fun<X, L, R> RightProjection<L, R>.flatMap(f: (R) -> Either<L, X>): Either<L, X> {
    return when (e) {
        is Left<L, R> -> Left(e.l)
        is Right<L, R> -> f(e.r)
    }
}


fun<L, R, X, Y> RightProjection<L, R>.map(x: Either<L, X>, f: (R, X) -> Y): Either<L, Y> {
    return flatMap { r -> x.right().map { xx -> f(r, xx) } }
}