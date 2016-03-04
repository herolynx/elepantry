package com.herolynx.pulpfile.utils

/**
 * Map over a list
 *
 * @param func high-order function
 * @param <T> type of input list
 * @param <V> type of output list
 */
fun <T, V> List<T>.map(func: (T) -> V): List<V> {
    val list = CollectionsKt.mutableListOf<V>()
    for (element: T in this) {
        list.add(func(element))
    }
    return list;
}