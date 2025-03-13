import { HttpClient } from '@angular/common/http';
import { Injectable,signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Kiadas } from '../models/Kiadas.model';

@Injectable({
  providedIn: 'root'
})
export class KiadasManagerService {

 kiadasAdat = signal<Kiadas[]>([]);
  private apiUrl = 'http://127.0.0.1:8000/api/kiadasok';
  private apiUrlKiadasKategoriak = 'http://127.0.0.1:8000/api/kiadaskategoriak';
    constructor(private http: HttpClient) 
  {
    window.addEventListener('storage', (event) => {
      if (event.key === this.kiadaskulcs) {
        this.kiadasokFigyeles.next(this.kiadasokLekereseReturn());
      }
    });
  }
  kiadasokOsszes: Kiadas[]= []

  kiadaskategoriatomb:any[] = []
 kiadasokLekeres(){
    const user = JSON.parse(localStorage.getItem('felhasznalo') || '{}');
    this.http.get(`${this.apiUrl}/felhasznalo/${user.felhasznaloID}`).subscribe((data: any) => {
      this.kiadasokOsszes = data;
      this.kiadasKategoriakLekerese()
      this.kiadasokOsszes.forEach((element : any) => {
        this.kiadaskategoriatomb.forEach((kiadasKategoriak: any) => {
          if(element.kategoriaID == kiadasKategoriak.kategoriaID){
            element.kategoriaNev = kiadasKategoriak.kiadasKategoria;
          }
        });
      });
      this.kiadasokOsszes.sort((a, b) => new Date(b.kiadasDatum).getTime() - new Date(a.kiadasDatum).getTime());
      localStorage.setItem('kiadasok', JSON.stringify(this.kiadasokOsszes))
      setTimeout(() => {
      this.kiadasAdat.set(this.kiadasokOsszes);
      console.log('Service Signal Frissitve default', this.kiadasAdat());
      }
      , 1000);
    });
    

    return this.kiadasokOsszes;
  }


  kiadasKategoriakLekerese(): any[]
  {
     this.http.get(`${this.apiUrlKiadasKategoriak}`).subscribe((data:any) => {
      this.kiadaskategoriatomb = data;
      localStorage.setItem('kiadaskategoriak', JSON.stringify(this.kiadaskategoriatomb))
     })
     return this.kiadaskategoriatomb;
  };

  kiadasTorlese(kiadasID: number):Observable<any>{
    let taroltTomb = JSON.parse(localStorage.getItem('kiadasok') || '[]');
      taroltTomb = taroltTomb.filter((item: any) => item.kiadasID !== kiadasID);
      localStorage.setItem('kiadasok', JSON.stringify(taroltTomb));
      console.log(JSON.parse(localStorage.getItem('kiadasok') || '[]'))
    return this.http.delete(`${this.apiUrl}/${kiadasID}`);
      
  }
  //KIADAS TESZT
  private kiadaskulcs = "kiadasok";
  private kiadasokFigyeles = new BehaviorSubject<any[]>(this.kiadasokLekereseReturn());
  kiadasok$ = this.kiadasokFigyeles.asObservable();
  private kiadasokLekereseReturn(): any[] {
    return JSON.parse(localStorage.getItem(this.kiadaskulcs) || '[]');
  }
  kiadasokReturn(): any[] {
    return this.kiadasokLekereseReturn();
  }
  kiadasTorles(index: number, kiadasID: number) {
    const frissitettKiadas = this.kiadasokLekereseReturn().filter((_, i) => i !== index);
    this.kiadasokFrissitese(frissitettKiadas);
    console.log(JSON.parse(localStorage.getItem(this.kiadaskulcs) || '[]'));
    return this.http.delete(`${this.apiUrl}/${kiadasID}`).subscribe(Response => {
      console.log(Response);
    });
  }
/*   kiadasokKategoriaNeve(){
    this.kiadasokLekeres();
    this.kiadasKategoriakLekerese();

    this.kiadasokOsszes.forEach(element => {
      this.kiadaskategoriatomb.forEach(kiadasKategoriak => 
        {
        if(element.kategoriaID = kiadasKategoriak.kategoriaID)
          {
          element.kategoriaNev = kiadasKategoriak.kiadasKategoria
          }
        
      });
    });
    localStorage.setItem('kiadasok', JSON.stringify(this.kiadasokOsszes));
  } */
  kiadasokFrissitese(ujKiadasok: Kiadas[]) {
    localStorage.setItem(this.kiadaskulcs, JSON.stringify(ujKiadasok));
    this.kiadasokFigyeles.next(ujKiadasok); 
    this.kiadasAdat.update(kiadasok => [...kiadasok, ...ujKiadasok]);
    console.log('Service Signal Frissitve frissitett', this.kiadasAdat());
  }
  kiadasHozzaadas(kiadasAdat: Kiadas):Observable<any>{
    const frissitettAdat = [...this.kiadasokLekereseReturn(), kiadasAdat];
    this.kiadasokFrissitese(frissitettAdat);
    return this.http.post(`${this.apiUrl}`, kiadasAdat)
    
  }
 

}
