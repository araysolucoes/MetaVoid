# MetaVoid

**Inspecione e proteja a privacidade dos seus arquivos.**

MetaVoid é um projeto open source da **Aray Soluções** para inspecionar e sanitizar metadados de imagens e documentos PDF diretamente no navegador, com foco em transparência, privacidade e facilidade de uso.

> **Status:** planejamento e desenvolvimento inicial. A interface e o processamento ainda não foram implementados.

## Objetivos

- Permitir selecionar arquivos JPG, JPEG, PNG, WebP e PDF.
- Exibir, quando tecnicamente possível, metadados presentes no arquivo antes do processamento.
- Oferecer opções de remoção de metadados não essenciais (como EXIF, XMP e propriedades de documentos), preservando o conteúdo visual.
- Gerar um novo arquivo para download e apresentar um relatório de alterações.
- Processar localmente no navegador, sem enviar arquivos para servidores.
- Publicar a interface estática pelo GitHub Pages.

## Limites técnicos e transparência

Metadados EXIF/XMP, informações de proveniência C2PA e marcas d'água digitais são mecanismos diferentes. A remoção de metadados convencionais **não garante** a eliminação de credenciais de proveniência, marcas d'água embutidas, sinais presentes nos pixels ou classificações feitas por plataformas e sistemas de detecção de IA. O projeto não promete tornar conteúdo gerado por IA indetectável nem contornar políticas de rotulagem.

A sanitização pode alterar atributos, perfis de cor, assinaturas digitais ou outras propriedades de arquivos. A implementação deverá sinalizar esses riscos e nunca sobrescrever o original automaticamente.

## Arquitetura planejada

- **Frontend:** React + TypeScript + Vite.
- **Hospedagem:** GitHub Pages.
- **Processamento:** bibliotecas JavaScript executadas no cliente, selecionadas após avaliação técnica.
- **Privacidade:** arquivos tratados localmente, sem backend de upload.

## Roteiro de desenvolvimento

1. Estruturar a aplicação, identidade visual e fluxo de seleção de arquivos.
2. Implementar leitura e apresentação de metadados.
3. Implementar sanitização de imagens e testes de preservação visual.
4. Implementar sanitização de propriedades de PDF e testes de integridade.
5. Adicionar relatório de processamento, acessibilidade e tratamento de erros.
6. Configurar build e deploy automatizado no GitHub Pages.

## Desenvolvimento local

As instruções de instalação e execução serão adicionadas após a criação do código-fonte.

## Contribuições

Sugestões, issues e pull requests são bem-vindos. Evite enviar arquivos privados ou sensíveis em issues públicas.

## Autoria

Desenvolvido pela **[Aray Soluções](https://github.com/araysolucoes)**.

Colaboração técnica: **[llongaray](https://github.com/llongaray)**.

## Licença

Distribuído sob a [Licença MIT](LICENSE).
