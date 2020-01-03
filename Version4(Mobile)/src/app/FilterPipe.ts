import { Component, OnInit, ViewChild, Inject, LOCALE_ID, Input ,Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'FilterPipe',
  })
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string, searchableList: any) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                var isTrue = false;
                for (var k in searchableList) {
                    if (el[searchableList[k]].toLowerCase().indexOf(input) > -1) {
                        isTrue = true;
                    }
                    if (isTrue) {
                        return el
                    }
                }
            })
        }
        return value;
    }
}