package com.herolynx.elepantry.func.model.option

import java.util.*

sealed class Option<out T> {

    abstract fun isEmpty(): Boolean

    fun nonEmpty(): Boolean = isDefined()

    fun isDefined(): Boolean = !isEmpty()

    abstract fun get(): T

    fun orNull(): T? {
        return if (isEmpty()) {
            null
        } else {
            get()
        }
    }

    fun<R> map(f: (T) -> R): Option<R> {
        return flatMap { Some(f(it)) }
    }

    fun<P1, R> map(p1: Option<P1>, f: (T, P1) -> R): Option<R> {
        return flatMap { t -> p1.map { pp1 -> f(t, pp1) } }
    }

    fun<R> fold(ifEmpty: () -> R, f: (T) -> R): R {
        return if (isEmpty()) {
            ifEmpty()
        } else {
            f(get())
        }
    }

    fun<R> flatMap(f: (T) -> Option<R>): Option<R> {
        return if (isEmpty()) {
            None
        } else {
            f(get())
        }
    }

    fun filter(predicate: (T) -> Boolean): Option<T> {
        return if (nonEmpty() && predicate(get())) {
            this
        } else {
            None
        }
    }

    fun filterNot(predicate: (T) -> Boolean): Option<T> {
        return if (nonEmpty() && !predicate(get())) {
            this
        } else {
            None
        }
    }

    fun exists(predicate: (T) -> Boolean): Boolean {
        return nonEmpty() && predicate(get())
    }

    fun forEach(f: (T) -> Unit) {
        if (nonEmpty()) f(get())
    }

    object None : Option<Nothing>() {
        override fun get() = throw NoSuchElementException("None.get")

        override fun isEmpty() = true

        override fun equals(other: Any?): Boolean {
            return when (other) {
                is None -> true
                else -> false
            }
        }

        override fun hashCode(): Int {
            return Integer.MAX_VALUE
        }
    }

    class Some<out T>(val t: T) : Option<T>() {
        override fun get() = t

        override fun isEmpty() = false

        override fun equals(other: Any?): Boolean {
            return when (other) {
                is Some<*> -> t!!.equals(other.get())
                is None -> false
                else -> false
            }

        }

        override fun hashCode(): Int {
            return t!!.hashCode() + 17
        }

        override fun toString(): String {
            return "Some<$t>"
        }
    }
}

fun<T> Option<T>.getOrElse(default: () -> T): T {
    return if (isEmpty()) {
        default()
    } else {
        get()
    }
}

fun<T> Option<T>.orElse(alternative: () -> Option<T>): Option<T> {
    return if (isEmpty()) {
        alternative()
    } else {
        this
    }
}

fun<T> T?.toOption(): Option<T> {
    return if (this != null) {
        Option.Some(this)
    } else {
        Option.None
    }
}

fun<T> optionTry(body: () -> T): Option<T> {
    return try {
        Option.Some(body())
    } catch(e: Exception) {
        Option.None
    }
}

fun<P1, R> Function1<P1, R>.optionLift(): (Option<P1>) -> Option<R> {
    return { it.map(this) }
}