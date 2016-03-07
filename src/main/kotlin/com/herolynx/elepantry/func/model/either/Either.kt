package com.herolynx.elepantry.func.model.either

import com.herolynx.elepantry.func.model.option.getOrElse

sealed class Either<out L, out R> {

    fun left() = LeftProjection(this)

    fun right() = RightProjection(this)

    abstract fun leftValue(): L?

    abstract fun rightValue(): R?

    abstract fun isLeft(): Boolean

    abstract fun isRight(): Boolean

    fun<X> fold(fl: (L) -> X, fr: (R) -> X): X {
        return when (this) {
            is Left<L, R> -> fl(this.l)
            is Right<L, R> -> fr(this.r)
        }
    }

    fun swap(): Either<R, L> {
        return when (this) {
            is Left<L, R> -> Right(this.l)
            is Right<L, R> -> Left(this.r)
        }
    }

    class Left<out L, out R>(val l: L) : Either<L, R>() {

        override fun leftValue() = l

        override fun rightValue() = null

        override fun isLeft(): Boolean = true

        override fun isRight(): Boolean = false

        override fun equals(other: Any?): Boolean {
            return when (other) {
                is Left<*, *> -> l!!.equals(other.l)
                else -> false

            }
        }

        override fun hashCode(): Int {
            return 43 * l!!.hashCode()
        }

        override fun toString(): String {
            return "Left($l)"
        }
    }

    class Right<out L, out R>(val r: R) : Either<L, R>() {

        override fun leftValue() = null

        override fun rightValue() = r

        override fun isLeft(): Boolean = false

        override fun isRight(): Boolean = true

        override fun equals(other: Any?): Boolean {
            return when (other) {
                is Right<*, *> -> r!!.equals(other.r)
                else -> false
            }
        }

        override fun hashCode(): Int {
            return 43 * r!!.hashCode()
        }

        override fun toString(): String {
            return "Right($r)"
        }
    }
}

fun<T> eitherTry(body: () -> T): Either<Exception, T> {
    return try {
        Either.Right(body())
    } catch(e: Exception) {
        Either.Left(e)
    }
}

fun <L> Either<L, Boolean>.toBoolean(): Boolean {
    return isRight() && right().toOption().getOrElse { false }
}

