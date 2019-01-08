import {Component, OnInit} from '@angular/core';
import {Part} from './part';
import {PartService} from './part.service';
import { PARTS } from '../mock-parts'
import { from } from 'rxjs';

@Component({
    selector: 'app-part',
    templateUrl: './part.component.html',
    styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit{

    parts: Part[];
    filteredParts: Part[];
    private _filterByType: string;
    filter: string;

    partToAdd = new Part;

    get filterByType(): string {
        return this._filterByType;
    }

    set filterByType(value: string){
        this._filterByType = value;
        this.filteredParts = this.filterParts(value);

    }

    filterParts(val: string){
        if (val === 'All'){
            return this.parts;
        } else if (val === 'isMan'){
            return this.parts.filter(part => part.mandatory == true);
        } else if (val === 'noMan'){
            return this.parts.filter(part => part.mandatory === false);
        }
    }
  
    constructor(private _partService : PartService){

    }

    testPrt(): void{
        
        //this.filteredParts = this.filterParts('All');
        this.filteredParts.forEach(part => console.log(part));
    }

    ngOnInit(): void{
        //this.parts = PARTS;

        this.getParts();
        this._filterByType = 'All';
        this.filteredParts = this.filterParts('All');
        
        //this.filterParts("All"); 
    }

    addPart(): void {
        console.log(this.partToAdd);
        this._partService.addPart(this.partToAdd)
        .subscribe((response) => {console.log(response)}, (error) =>{
            console.log(error);
        });
        this.getParts();
        this.filteredParts = this.filterParts('All');
        this.partToAdd.name = null;
        this.partToAdd.mandatory = false;
        this.partToAdd.currentQuantity = null;
    }

    deletePart(partId: string): void {
        this._partService.deletePart(partId)
        .subscribe((response) => {console.log(response)}, (error) =>{
            console.log(error);
        });
        this.getParts();
    }

    getParts(): void{
        //this.parts = PARTS;
        this._partService.getAllParts()
        .subscribe((partData) => { 
            this.parts = partData
           // , console.log(partData)
        }, (error) => {
            console.log(error);
        });

        this._partService.getAllParts()
        .subscribe((partData) => { 
            this.filteredParts = partData
           // , console.log(partData)
        }, (error) => {
            console.log(error);
        });
        
        //this.filteredParts = this.filterParts('All');
    }

    selectedPart: Part;
    selectedRow : Number;
    onSelect(part: Part, index): void {
        this.selectedPart = new Part;
        this.selectedPart.id = part.id;
        this.selectedPart.name = part.name;
        this.selectedPart.mandatory = part.mandatory;
        this.selectedPart.currentQuantity = part.currentQuantity;
        this.selectedRow = index;
    }

    updatePart(): void {
        console.log(this.selectedPart);
        this._partService.addPart(this.selectedPart)
        .subscribe((response) => {console.log(response)}, (error) =>{
            console.log(error);
        });
        this.getParts();
        //this.filteredParts = this.filterParts('All');
    }



    //sorting
    key: string = 'name'; //default
    reverse: boolean = false;
    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

    //init page
    p: number = 1;

}