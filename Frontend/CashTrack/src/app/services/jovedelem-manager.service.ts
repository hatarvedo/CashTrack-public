import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, count, Observable } from 'rxjs';
import { Jovedelem } from '../models/Jovedelem.model';

@Injectable({
  providedIn: 'root'
})
export class JovedelemManagerService {

  private apiUrlJovedelemKategoriak = 'http://127.0.0.1:8000/api/jovedelemkategoriak';
  private apiUrlJovedelmek = 'http://127.0.0.1:8000/api/jovedelmek';

  constructor(private http: HttpClient) 
  {
    window.addEventListener('storage', (event) => {
      if (event.key === this.jovedelemkulcs) {
        this.jovedelemFigyeles.next(this.jovedelemVizsgalatLekerese());
      }
    });
  }

jovedelemAdat = signal<Jovedelem[]>([])
  jovedelemkategoriak: any[] =[];  
  jovedelmek: {jovedelemID: number, felhasznaloID: number, bevetelHUF: number, bevetelDatum: string, kategoriaID: any }[] = [];
  
  KategoriakLekerese()
  {
    this.http.get(`${this.apiUrlJovedelemKategoriak}`).subscribe((data:any) =>{
      this.jovedelemkategoriak = data;
      localStorage.setItem('jovedelemkategoriak',JSON.stringify(this.jovedelemkategoriak));
    })
  };
  jovedelemLekeres(){
    const user = JSON.parse(localStorage.getItem('felhasznalo') || '{}')
    this.http.get(`${this.apiUrlJovedelmek}/felhasznalo/${user.felhasznaloID}`).subscribe((data: any) => {
      this.jovedelmek = data;
      console.log(this.jovedelmek)
      this.jovedelmek.sort((a, b) => new Date(b.bevetelDatum).getTime() - new Date(a.bevetelDatum).getTime());
      localStorage.setItem('jovedelmek',JSON.stringify(this.jovedelmek));
      this.jovedelemAdat.set(this.jovedelmek);
    })
  }
jovedelemAdatok: Jovedelem[] = [];
  jovedelemLekeresJSON(){
    const user = JSON.parse(localStorage.getItem('felhasznalo') || '{}');
    this.http.get(`${this.apiUrlJovedelmek}/felhasznalo/${user.felhasznaloID}`).subscribe((data: any) => {
      this.jovedelemAdatok = data;
      console.log('jovedelemek LEKERESEJSON',this.jovedelemAdatok);
      this.jovedelemAdatok.sort((a, b) => new Date(b.bevetelDatum).getTime() - new Date(a.bevetelDatum).getTime());
      
    })
    
    return this.jovedelemAdatok;
  }
  //Observable
  private jovedelemkulcs = "jovedelmek";
  private jovedelemFigyeles = new BehaviorSubject<any[]>(this.jovedelemVizsgalatLekerese());
  jovedelem$ = this.jovedelemFigyeles.asObservable();
  private jovedelemVizsgalatLekerese(): any[] {
    return JSON.parse(localStorage.getItem(this.jovedelemkulcs) || '[]');
  }
  jovedelemVizsgalatLekereseJSON(): Jovedelem[] {
    return this.jovedelemVizsgalatLekerese();
  }
  JovedelemFeltoltes(jovedelemAdatok:{felhasznaloID:number, bevetelHUF: number, bevetelDatum: string,kategoriaID: number}):Observable<any>{
    return this.http.post(`${this.apiUrlJovedelmek}`, jovedelemAdatok);
}
jovdelemekFrissitese(ujJovedelmek: any[]) {
  localStorage.setItem(this.jovedelemkulcs, JSON.stringify(ujJovedelmek));
  this.jovedelemFigyeles.next(ujJovedelmek); 
  this.jovedelemAdat.update(jovedelemAdat => [...jovedelemAdat, ...ujJovedelmek]);
}


 jovedelemHozzaadas(jovedelemAdat: {felhasznaloID:number, bevetelHUF: number, bevetelDatum: string,kategoriaID: any}):Observable<any>{
  const frissitettAdat = [...this.jovedelemVizsgalatLekerese(), jovedelemAdat];
  this.jovdelemekFrissitese(frissitettAdat);
  return this.http.post(`${this.apiUrlJovedelmek}`, jovedelemAdat)
  
} 
tomb: any[] = []
szamolas = signal<number>(0);
countTemp = 0;
jovOsszeadas(){
  const user = JSON.parse(localStorage.getItem('felhasznalo') || '{}');
  this.http.get(`${this.apiUrlJovedelmek}/felhasznalo/${user.felhasznaloID}`).subscribe((data:any) => {
    this.tomb = data;
    console.log('Tömb adatok (jövedelem)',this.tomb);
    this.countTemp = 0;
    this.tomb.forEach(element => {
      
      this.countTemp  += element.bevetelHUF;
      console.log("countTemp változó:",this.countTemp);
    });
    this.szamolas.update(count => this.countTemp)
    console.log("Ez itt mi?",this.szamolas())
  });
  return this.szamolas;
}

//Jovedelem adatok figyelése és kezelése
havijovedelem = signal<number>(0);
jovedelemlista: any[] = [];

havijovedelemVegleges = signal(this.havijovedelem)

jovedelemTorles(index: number, jovedelemID: number) {
  const frissitettJovedelem = this.jovedelemVizsgalatLekerese().filter((_, i) => i !== index);
  this.jovdelemekFrissitese(frissitettJovedelem);
  console.log(JSON.parse(localStorage.getItem(this.jovedelemkulcs) || '[]'));
  
  return this.http.delete(`${this.apiUrlJovedelmek}/${jovedelemID}`).subscribe(response => {
    console.log(response);
    this.jovOsszeadas();
  });
}

}
