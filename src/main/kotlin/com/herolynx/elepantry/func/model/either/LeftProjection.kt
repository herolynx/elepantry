package com.herolynx.elepantry.func.model.either

import com.herolynx.elepantry.func.model.either.Either.*
import com.herolynx.elepantry.func.model.option.Option
import com.herolynx.elepantry.func.model.option.Option.*
import java.util.*

final class LeftProjection<out L, out R>(val e: Either<L, R>) {

    fun get(): L {
        return when (e) {
            is Left<L, R> -> e.l
            else -> throw NoSuchElementException("Either.left.value on Right")
        }
    }

    fun forEach(f: (L) -> Unit) {
        return when (e) {
            is Left<L, R> -> f(e.l)
            else -> {
            }
        }
    }


    fun exists(predicate: (L) -> Boolean): Boolean {
        return when (e) {
            is Left<L, R> -> predicate(e.l)
            else -> false
        }
    }


    fun<X> map(f: (L) -> X): Either<X, R> {
        return flatMap { Left<X, R>(f(it)) }
    }

    fun filter(predicate: (L) -> Boolean): Option<Either<L, R>> {
        return when (e) {
            is Left<L, R> -> {
                if (predicate(e.l)) {
                    Some(e)
                } else {
                    None
                }
            }
            else -> None
        }
    }

    fun toOption(): Option<L> {
        return when (e) {
            is Left<L, R> -> Some(e.l)
            else -> None
        }
    }

}

fun<L, R, X> LeftProjection<L, R>.flatMap(f: (L) -> Either<X, R>): Either<X, R> {
    return when (e) {
        is Left<L, R> -> f(e.l)
        is Right<L, R> -> Right(e.r)
    }
}

fun<L, R, X, Y> LeftProjection<L, R>.map(x: Either<X, R>, f: (L, X) -> Y): Either<Y, R> {
    return flatMap { l -> x.left().map { xx -> f(l, xx) } }
}

fun<R, L> LeftProjection<L, R>.getOrElse(default: () -> L): L {
    return when (e) {
        is Left<L, R> -> e.l
        else -> default()
    }
}