import Vue from "vue";
import russianTranslation from './assets/lang/ru.json';
Vue.filter('translate', (value) => {
	return binary_search(Object.keys(russianTranslation).length, value);
})
// Vue.filter('currency', num => {
//     if (!num) {
//         return '0.00';
//     }
//     const number = (num / 1).toFixed(2).replace(',', '.');
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// });

function binary_search(length, needle) {
	let leftIndex = 0;
    let rightIndex  = length;
    while (leftIndex <= rightIndex) {
		let index =  Math.floor((leftIndex + rightIndex) / 2);
		let middleKey = Object.keys(russianTranslation)[index];
		if (middleKey < needle) {
		leftIndex = index + 1
		}
		else if (middleKey > needle) {
		rightIndex = index - 1;
		}
		else if (middleKey == needle) {
		return russianTranslation[middleKey];
		}
		else if (index == length || index == 0 ) {
		return needle;
		}
	}

    return needle;
}

