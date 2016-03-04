package com.herolynx.pulpfile.func.collections

/**
 * Convert to list
 */
fun <T> Iterable<T>.toList(): List<T> {
    return CollectionsKt.toList(this);
}

/**
 * Map over a list
 *
 * @param func high-order function
 * @param <T> type of input list
 * @param <V> type of output list
 */
fun <T, V> Iterable<T>.map(func: (T) -> V): Iterable<V> {
    val list = CollectionsKt.mutableListOf<V>()
    for (element: T in this) {
        list.add(func(element))
    }
    return list;
}

/**
 * Convert into map
 *
 * @param key key creator
 * @param <K> type of key
 * @param <V> type of value
 */
fun <K, V> Iterable<V>.toMap(key: (V) -> K): Map<K, V> {
    val map = MapsKt.mutableMapOf<K, V>()
    for (element: V in this) {
        map.put(key(element), element)
    }
    return map;
}