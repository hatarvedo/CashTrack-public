import { HttpClient } from '@angular/common/http';
import { Component, computed, Signal, signal, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JovedelemManagerService } from '../../services/jovedelem-manager.service';
import { KiadasManagerService } from '../../services/kiadas-manager.service';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { ExpenselistComponent } from './expenselist/expenselist.component';
import { GraphComponent } from '../graph/graph.component';
import { PolarareaComponent } from '../../polararea/polararea.component';
import { Kiadas } from '../../models/Kiadas.model';
import { IncomelistComponent } from './incomelist/incomelist.component';
import { PiechartComponent } from '../piechart/piechart.component';
import { count } from 'rxjs';



@Component({
    selector: 'app-dashboard',
    imports: [FormsModule, RouterLink,NgFor,ExpenselistComponent,GraphComponent,PolarareaComponent,NgIf,IncomelistComponent,PiechartComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  kiadasokService: any;

  
constructor(private router: Router,private http: HttpClient, private kiadasService: KiadasManagerService, private jovedelemService: JovedelemManagerService, private authService: AuthService){}

//Felhasznalo ID 
felhasznalo = JSON.parse(localStorage.getItem('felhasznalo') || '{}');
felhasznaloID = this.felhasznalo.felhasznaloID;
user = JSON.parse(localStorage.getItem('felhasznalo') || '{}');
kiadasok: any[]  =[];
jovedelmek:any[] = [];
jovedelemKategoriak: any = [];
kiadasKategoriak: any = [];
currentYear: number = 0; 
  currentMonth: number = 0; 
  currentDay: number = 0;
  wholeYear: number = 0;
  private subscription: any;
  //Bevétel függvények
  jovedelemKategoriakLekeres():void{
    this.jovedelemService.KategoriakLekerese() 
  }
  jovedelemTipus:any = '';
  jovedelemErtek:number = 0;
  jovedelemDatum:string = '';
  
  jovedelemHozzadasa(){
    const jovedelemAdatok ={
      felhasznaloID: this.felhasznaloID,
      bevetelHUF: this.jovedelemErtek,
      bevetelDatum:this.jovedelemDatum,
      kategoriaID: this.jovedelemTipus,
      
    }
    this.jovedelemkategoriatomb.forEach((kategoriak: any) => {
      //A kategoriaID megkapja először stringben a nevét, majd az ID-t
      if(jovedelemAdatok.kategoriaID == kategoriak.jovedelemKategoria){
        console.log('Kategoria neve:',jovedelemAdatok.kategoriaID);
        jovedelemAdatok.kategoriaID = kategoriak.kategoriaID
        console.log('Kategoria ID:',jovedelemAdatok.kategoriaID);
        console.log('Kategoriak.kategoriaID:',kategoriak.kategoriaID);
      }
    });
    if(jovedelemAdatok.bevetelHUF && jovedelemAdatok.bevetelDatum && jovedelemAdatok.kategoriaID){
      this.jovedelemService.jovedelemHozzaadas(jovedelemAdatok).subscribe((data: any) => {
        console.log(data);
        
        alert('Bevétel sikeresen hozzáadva!')
        this.jovedelmek.push(jovedelemAdatok);
        this.jovedelemService.jovedelemLekeres()
        this.HaviJovedelemFrissitese();
        this.HaviOsszesFrissitese(); 
        setTimeout(() => {
          this.incomelist?.ngOnInit();
        }, 700);
        
        
      });
    }
    else{
      alert('Bevétel hozzáadása sikertelen!');
    }
  }
 
  
    //Kiadás függvények
  
  kiadasTipus:any = '';
  kiadasErtek:number = 0;
  kiadasDatum:string = '';
  kiadasMegjegyzes:string = '';
  kiadaskategoriatomb:any[] = [];
  Kiadas : Kiadas = {
    kiadasID: 0,
    felhasznaloID: 0,
    kiadasHUF: 0,
    kiadasDatum: '',
    kategoriaID: 0,
    kiadasKomment: '',
    
    
  };
  kiadasAdat = signal<Kiadas[]>([]);
  @ViewChild(PolarareaComponent) polarareachart: PolarareaComponent | undefined;
  @ViewChild(GraphComponent) graph: GraphComponent | undefined;
  @ViewChild(PiechartComponent) piechart: PiechartComponent | undefined;
  @ViewChild(IncomelistComponent) incomelist: IncomelistComponent | undefined;
  grafikonFrissitese(){
    this.polarareachart?.ngAfterViewInit();
    this.graph?.ngOnInit();
    this.piechart?.ngAfterViewInit();
    this.incomelist?.ngOnInit();

   
  }
  kiadasHozzaadas(){
    const kiadasAdatok: Kiadas = {
      felhasznaloID: this.felhasznaloID,
      kiadasHUF: this.kiadasErtek,
      kiadasDatum: this.kiadasDatum,
      kategoriaID: this.kiadasTipus,
      kiadasKomment: this.kiadasMegjegyzes,
      
    };
    
    if (kiadasAdatok.kiadasHUF && kiadasAdatok.kiadasDatum && kiadasAdatok.kategoriaID) {
      this.kiadasService.kiadasHozzaadas(kiadasAdatok).subscribe((response: any) => {
        
        if(response){
          console.log('Kiadás hozzáadva',kiadasAdatok);
          alert('Kiadás sikeresen hozzáadva!');
          this.kiadasService.kiadasokLekeres();
          this.HaviKiadasokFrissitese();
          this.HaviOsszesFrissitese(); 
          setTimeout(() => {
            this.grafikonFrissitese();
          }, 2000);
          
          
        }
        else{
          alert('Kiadás hozzáadása sikertelen!');
        };
      });
    };
  };
  jovedelemkategoriatomb: any[] = [];
  kiadasokFelugyelet: any[] = []
    jovedelemFelugyelet:any[] = []
    ngOnInit(): void {
      this.authService.login();
      this.kiadasService.kiadasKategoriakLekerese();
      this.jovedelemService.KategoriakLekerese();
      this.jovedelemKategoriakLekeres();
      
      console.log('kiadaskategoriak:',this.kiadaskategoriatomb);
      
      this.jovedelemService.jovedelemLekeres();
      setTimeout(() => {
        this.HaviJovedelemFrissitese();
        this.HaviKiadasokFrissitese();
        this.HaviOsszesFrissitese(); 
        this.kiadaskategoriatomb = JSON.parse(localStorage.getItem('kiadaskategoriak') || '[]');
        this.jovedelemkategoriatomb = JSON.parse(localStorage.getItem('jovedelemkategoriak') || '[]');
      },1000)

  
    }
    //Jövedelem havi kezelése
  jovedelemHaviTemp : number = 0;
  havijovedelmek = computed(() => this.jovedelemService.szamolas());   
  
/*   HaviJovedelemFrissitese(){
    this.jovedelemFelugyelet = this.jovedelemService.jovedelemLekeresJSON();
    console.log('jovedelem havi frissitese',this.jovedelemFelugyelet);
   
    this.jovedelemHaviTemp = 0;
    this.jovedelemFelugyelet.forEach((element:any) => {
      this.jovedelemHaviTemp = this.jovedelemHaviTemp + element.bevetelHUF
    });
    this.HaviOsszesFrissitese(); 
    return this.havijovedelmek.update(count => this.jovedelemHaviTemp)
  } */
    
    HaviJovedelemFrissitese(){

      /* this.jovedelmek = JSON.parse(localStorage.getItem('jovedelmek') || '[]');
      this.jovedelemHaviTemp = 0;
      this.jovedelmek.forEach((element:any) => {
        this.jovedelemHaviTemp = this.jovedelemHaviTemp + element.bevetelHUF
      });
      this.HaviOsszesFrissitese(); 
      return this.havijovedelmek.update(count => this.jovedelemHaviTemp) */
      this.jovedelemService.jovOsszeadas()
      
      console.log('havijovdelemek signal',this.havijovedelmek())
     
    }
 
  
  //Kiadások havi kezelése
  havikiadasokSzamolo:number = 0;
  havikiadasok =computed(() => this.kiadasService.szamolas()); 
  
  
  HaviKiadasokFrissitese(){
    /* this.kiadasok = JSON.parse(localStorage.getItem('kiadasok') || '[]');
    this.havikiadasokSzamolo = 0;
    this.kiadasok.forEach((element:any) => {
      this.havikiadasokSzamolo = this.havikiadasokSzamolo + element.kiadasHUF;
    });
    this.HaviOsszesFrissitese();
    return this.havikiadasok.update(count => this.havikiadasokSzamolo) */
    this.kiadasService.kiadOsszeadas()
    
  }

  haviosszes = computed(() => this.havijovedelmek() - this.havikiadasok());   ;
  
  HaviOsszesFrissitese(){
   /*  return this.haviosszes.update(count => this.havijovedelmek() - this.havikiadasok()) */
  }
    logout(): void {
      this.authService.logout();
      localStorage.removeItem('felhasznalo');
      this.router.navigate(['home']);
      this.authService.logout();
      localStorage.clear();
    }
  
    notWorking(): void{
      alert('Ez a funkció jelenleg nem elérhető!');
    }
    
    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}
