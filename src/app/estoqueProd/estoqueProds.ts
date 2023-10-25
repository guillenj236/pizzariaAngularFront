export class EstoqueProds{
    id!:number;
    precoProdutos!: number;
    nomeProduto!: string;

    public setId(id: number){
        this.id = id;
    }
    public setPrecoProdutos(precoProdutos: number){
        this.precoProdutos = precoProdutos;
    }
    public setNomeProduto(nomeProduto: string){
        this.nomeProduto = nomeProduto;
    }
}