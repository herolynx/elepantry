package com.herolynx.pulpfile.func.collections

import java.util.*

/**
 * Convert to list
 */
fun <T> Iterable<T>.toList(): List<T> {
    val list = ArrayList<T>()
    for (t: T in this) {
        list.add(t)
    }
    return list
}

/**
 * Map over a list
 *
 * @param func high-order function
 * @param <T> type of input list
 * @param <V> type of output list
 */
fun <T, V> Iterable<T>.map(func: (T) -> V): Iterable<V> {
    val list = ArrayList<V>()
    for (element: T in this) {
        list.add(func(element))
    }
    return list
}

/**
 * Convert into map
 *
 * @param key key creator
 * @param <K> type of key
 * @param <V> type of value
 */
fun <K, V> Iterable<V>.toMap(key: (V) -> K): Map<K, V> {
    val map = HashMap<K, V>()
    for (element: V in this) {
        map.put(key(element), element)
    }
    return map
}