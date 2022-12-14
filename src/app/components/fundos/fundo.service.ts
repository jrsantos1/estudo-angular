import { Fundos, Var } from './fundos.module';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Directive, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundoService {

  constructor(private router: Router, private http: HttpClient) { }

  baseUrl = 'http://127.0.0.1:5000/api-jhon' // base url api
  baseUrlMultimesas = 'http://127.0.0.1:5000/multimesas'
  baseUrlCotacao = 'https://economia.awesomeapi.com.br/json/last/USD-BRL'
  baseUrlGrafico = 'http://127.0.0.1:5000/var'

  testeExibiMensagem(){
    console.log('Deu certo')
  }

  cancelarSalvar(){
    this.router.navigate(["/fundos/"])
  }

  obterDadosFundos(): Observable<Fundos[]>{
    return this.http.get<Fundos[]>(this.baseUrl)
  }

  getAllMultimesas(): Observable<Fundos[]> {
    return this.http.get<Fundos[]>(this.baseUrlMultimesas)
  }

  criarFundo(fundo: Fundos): Observable<Fundos>{
    //console.log(this.http.post<Fundos>(this.baseUrl, fundo))
    return this.http.post<Fundos>(this.baseUrl,fundo)
  }

  pegarCotacaoAtual(): Observable<string>{
    return this.http.get<string>(this.baseUrlCotacao)
  }

  getVar(): Observable<Var[]>{
    return this.http.get<Var[]>(this.baseUrlGrafico)
  }

  dadosGrafico(){
    let dataset: Var[] = [];
    let dados: string[] = [];
    this.getVar().subscribe(retorno => {
      dataset = retorno
    })

    for (let iterator of dataset) {
      dados.push(iterator.nome)
    }
    console.log("o reusltado é ");

    console.log(dataset);


    return dados;
  }


}
