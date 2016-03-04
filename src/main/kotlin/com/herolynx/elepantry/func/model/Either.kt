package com.herolynx.elepantry.func.model

sealed class Either<out L, out R> {

    abstract fun left(): Option<L>

    abstract fun right(): Option<R>

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

        override fun left() = l.toOption()

        override fun right() = Option.None

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

        override fun left() = Option.None

        override fun right() = r.toOption()

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
    return isRight() && right().toOption().get().getOrElse { false }
}

