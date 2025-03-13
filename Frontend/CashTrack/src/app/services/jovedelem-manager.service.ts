import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
    })
  }
  //Observable
  private jovedelemkulcs = "jovedelmek";
  private jovedelemFigyeles = new BehaviorSubject<any[]>(this.jovedelemVizsgalatLekerese());
  jovedelem$ = this.jovedelemFigyeles.asObservable();
  private jovedelemVizsgalatLekerese(): any[] {
    return JSON.parse(localStorage.getItem(this.jovedelemkulcs) || '[]');
  }

  JovedelemFeltoltes(jovedelemAdatok:{felhasznaloID:number, bevetelHUF: number, bevetelDatum: string,kategoriaID: number}):Observable<any>{
    return this.http.post(`${this.apiUrlJovedelmek}`, jovedelemAdatok);
}
jovdelemekFrissitese(ujJovedelmek: any[]) {
  localStorage.setItem(this.jovedelemkulcs, JSON.stringify(ujJovedelmek));
  this.jovedelemFigyeles.next(ujJovedelmek); 
}


 jovedelemHozzaadas(jovedelemAdat: {felhasznaloID:number, bevetelHUF: number, bevetelDatum: string,kategoriaID: any}):Observable<any>{
  const frissitettAdat = [...this.jovedelemVizsgalatLekerese(), jovedelemAdat];
  this.jovdelemekFrissitese(frissitettAdat);
  return this.http.post(`${this.apiUrlJovedelmek}`, jovedelemAdat)
  
} 

//Jovedelem adatok figyelése és kezelése
havijovedelem: number = 0;
jovedelemlista: any[] = [];
szamolas = signal<number>(0);
havijovedelemVegleges = signal(this.havijovedelem)
jovOsszeadas(){
  this.jovedelemlista = JSON.parse(localStorage.getItem('jovedelmek')|| '[]');
  this.jovedelemlista.forEach(element => {
    this.havijovedelem += element.bevetelHUF
    this.szamolas.update(() => this.havijovedelem)
   
    return this.havijovedelem
  }); 
}
jovedelemTorles(index: number, jovedelemID: number) {
  const frissitettJovedelem = this.jovedelemVizsgalatLekerese().filter((_, i) => i !== index);
  this.jovdelemekFrissitese(frissitettJovedelem);
  console.log(JSON.parse(localStorage.getItem(this.jovedelemkulcs) || '[]'));
  return this.http.delete(`${this.apiUrlJovedelmek}/${jovedelemID}`).subscribe(response => {
    console.log(response);
  });
}

}
