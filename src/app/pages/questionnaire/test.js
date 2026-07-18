function merge(left, right) {
  let results = [];
  let i = 0;
  let j = 0;
  let lLength = left.length;
  let rLength = right.length;
  while (i < lLength && j < rLength) {
    if (left[i] > right[j]) {
      results.push(right[j]);
      j++;
    } else {
      results.push(left[i]);
      i++;
    }
  }
  while (i < lLength) {
    results.push(left[i]);
    i++;
  }
  while (j < rLength) {
    results.push(right[j]);
    j++;
  }
  return results;
}

function mergeSort(arr) {
  if (arr.length === 1) return arr;
  let midVal = arr.length / 2;
  let left = mergeSort(arr.slice(0, midVal));
  let right = mergeSort(arr.slice(midVal));
  return merge(left, right);
}

mergeSort([9, 1, 8, 2, 4, 36, 78]);


function quickSort(arr){
    if(arr.length === 1) return arr;
    let i=0;
    let j=0;
    let apointer=1;
    let pivotIndex=0;
    let temp;
    let arrLength= arr.length;
    while(apointer < arrLength){
        if(arr[pivotIndex] < arr[apointer])
    }

}