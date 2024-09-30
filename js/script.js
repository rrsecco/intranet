let card = document.getElementById('content-container');
let _s1 = document.getElementById('s1');
let _s2 = document.getElementById('s2');
let _s3 = document.getElementById('s3');
let _s4 = document.getElementById('s4');
let listagem = document.getElementById('list_list');
let content;

function addDeleteEventListeners(table) {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            let row = event.target.closest('tr');
            let itemId = row.querySelector('td:first-child').textContent;

            try {
                let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/delete_item/${table}/${itemId}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    alert("Item excluído com sucesso!");
                    row.remove(); // Remove a linha da tabela após exclusão
                } else {
                    let errorData = await response.json();
                    console.error("Erro ao excluir item:", errorData);
                    alert("Erro ao excluir item: " + errorData.message);
                }
            } catch (error) {
                console.error("Erro na requisição de exclusão:", error);
                alert("Erro ao tentar excluir o item.");
            }
        });
    });
}

function addEditEventListeners(table) {
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', async (event) => {
            let row = event.target.closest('tr');
            let itemId = row.querySelector('td:first-child').textContent;

            try {
                let content = '';
                if (table === "sorte_ou_azar") {
                    // Fetch the item data
                let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/get_item/${table}/${itemId}`);
                if (!response.ok) {
                throw new Error('Erro ao buscar dados do item');
                }
                let itemData = await response.json();
                    content = `
                    <h1>Sorte ou Azar</h1>
                    <label for="sorte_ou_azar_descricao">Descrição</label>
                    <textarea id="sorte_ou_azar_descricao" maxlength="255" rows="3" cols="50">${itemData.descricao}</textarea>
                    <label for="file_sorte_ou_azar">Imagem</label>
                    <input type="file" id="file_sorte_ou_azar">
                    <button type="submit" id="submit_edit_sorte_ou_azar">Enviar</button>
                    `;
                } else if (table === "consequencia") {
                    // Fetch the item data
                    let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/get_item/${table}/${itemId}`);
                    if (!response.ok) {
                    throw new Error('Erro ao buscar dados do item');
                    }
                    let itemData = await response.json();
                    content = `
                    <h1>Zona de Perigo</h1>
                    <label for="zona_de_perigo_descricao">Descrição</label>
                    <textarea id="zona_de_perigo_descricao" maxlength="255" rows="3" cols="50">${itemData.descricao}</textarea>
                    <label for="file_zona_de_perigo">Imagem</label>
                    <input type="file" id="file_zona_de_perigo">
                    <button type="submit" id="submit_edit_consequencia">Enviar</button>
                    `;
                } else if (table === "curiosidade") {
                    // Fetch the item data
                    let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/get_item/${table}/${itemId}`);
                    if (!response.ok) {
                    throw new Error('Erro ao buscar dados do item');
                    }
                    let itemData = await response.json();
                    content = `
                    <h1>Curiosidades</h1>
                    <label for="curiosidade_descricao">Descrição</label>
                    <textarea id="curiosidade_descricao" maxlength="255" rows="3" cols="50">${itemData.descricao}</textarea>
                    <label for="file_curiosidade">Imagem</label>
                    <input type="file" id="file_curiosidade">
                    <button type="submit" id="submit_edit_curiosidade">Enviar</button>
                    `;
                } else if (table === "quiz") {
                    // Fetch the item data
                    let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/get_item/${table}/${itemId}`);
                    if (!response.ok) {
                    throw new Error('Erro ao buscar dados do item');
                    }
                    let itemData = await response.json();
                    content = `
                    <h1>Quizes</h1>
                    <label for="quiz_pergunta">Pergunta</label>
                    <input type="text" id="quiz_pergunta" value="${itemData.pergunta}">
                    <label for="quiz_resposta">Resposta</label>
                    <input type="text" id="quiz_resposta" value="${itemData.resposta}">
                    <label for="file_quiz">Imagem</label>
                    <input type="file" id="file_quiz">
                    <button type="submit" id="submit_edit_quiz">Enviar</button>
                    `;
                }

                card.innerHTML = content;

                let submitButton = document.querySelector(`#submit_edit_${table}`);
                if (submitButton) {
                    submitButton.addEventListener('click', async () => {
                        let formData = new FormData();

                        if (table === "sorte_ou_azar" || table === "curiosidade") {
                            let descricao = document.getElementById(`${table}_descricao`).value;
                            let arquivo = document.getElementById(`file_${table}`).files[0];
                            formData.append('descricao', descricao);
                            if (arquivo) {
                                formData.append('arquivo', arquivo);
                            }
                        } else if (table === "consequencia") {
                            let descricao = document.getElementById('zona_de_perigo_descricao').value;
                            let arquivo = document.getElementById('file_zona_de_perigo').files[0];
                            formData.append('descricao', descricao);
                            if (arquivo) {
                                formData.append('arquivo', arquivo);
                            }
                        } else if (table === "quiz") {
                            let pergunta = document.getElementById('quiz_pergunta').value;
                            let resposta = document.getElementById('quiz_resposta').value;
                            let arquivo = document.getElementById('file_quiz').files[0];
                            formData.append('pergunta', pergunta);
                            formData.append('resposta', resposta);
                            if (arquivo) {
                                formData.append('arquivo', arquivo);
                            }
                        }

                        try {
                            let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/edit/${table}/${itemId}`, {
                                method: "PUT",
                                body: formData
                            });

                            if (response.ok) {
                                alert("Item editado com sucesso!");
                                // Recarrega a página atual
                                loadOption('sorte_ou_azar');
                            } else {
                                let errorData = await response.json();
                                console.error("Erro ao editar item: ", errorData);
                            }
                        } catch (error) {
                            console.error("Erro ao editar o item:", error);
                            alert("Erro ao tentar editar o item.");
                        }
                    });
                } else {
                    console.error(`Submit button with ID #submit_edit_${table} not found.`);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do item:", error);
                alert("Erro ao buscar dados do item.");
            }
        });
    });
}

function selectSection(selectedSection) {
    let sections = [_s1, _s2, _s3, _s4, listagem];
    sections.forEach(section => {
        if (section === selectedSection) {
            section.style.background = "#34495e";
            if (section === listagem) {
                section.style.color = "black";
                section.style.background = "white";
            }
        } else {
            section.style.background = "";
            if (section === listagem) {
                section.style.color = "white";
                section.style.background = "red";
            }
        }
    });
}

function loadOption(tela) {
    // Clear previous content for other sections
    card.innerHTML = "";
    selectSection(null); // Deselect all sections

    if (tela === "sorte_ou_azar") {
        content =
            `
            <h1>Sorte ou Azar</h1>
                <label for="sorte_ou_azar_descricao">Descrição</label>
                <textarea id="sorte_ou_azar_descricao" maxlength="255" rows="3" cols="50"></textarea>
                <label for="file_sorte_ou_azar">Imagem</label>
                <input type="file" id="file_sorte_ou_azar">
                <button type="submit" id="submit_sorte_ou_azar">Enviar</button>
        `;
        selectSection(_s1);
    } else if (tela === "consequencias") {
        content = `
            <h1>Zona de Perigo</h1>
                <label for="zona_de_perigo_descricao">Descrição</label>
                <textarea id="zona_de_perigo_descricao" name="descricao" maxlength="255"></textarea>
                <label for="file_zona_de_perigo">Imagem</label>
                <input type="file" id="file_zona_de_perigo" name="arquivo">
                <button type="submit" id="submit_zona_de_perigo">Enviar</button>
        `;
        selectSection(_s2);
    } else if (tela === "curiosidades") {
        content = `
            <h1>Curiosidades</h1>
                <label for="curiosidade_descricao">Descrição</label>
                <textarea id="curiosidade_descricao" maxlength="255"></textarea>
                <label for="file_curiosidade">Imagem</label>
                <input type="file" id="file_curiosidade">
                <button type="submit" id="submit_curiosidade">Enviar</button>
        `;
        selectSection(_s3);
    } else if (tela === "quizes") {
        content = `
            <h1>Quizes</h1>
                <label for="quiz_per">Pergunta</label>
                <input type="text" id="quiz_per">
                <label for="quiz_res">Resposta</label>
                <input type="text" id="quiz_res">
                <label for="file_quiz">Imagem</label>
                <input type="file" id="file_quiz">
                <button type="submit" id="submit_quizes">Enviar</button>
        `;
        selectSection(_s4);
    } else if (tela === "list") {
        content = `
            <h1>Listagem</h1>
            <div class="filter-container">
                <label for="filter">Filtrar por ...</label>
                <select id="filter">
                    <option value="" selected disabled>Selecionar</option>
                    <option value="em_sorte_ou_azar">Sorte ou Azar</option>
                    <option value="em_zona_de_perigo">Zona de Perigo</option>
                    <option value="em_curiosidade">Curiosidades</option>
                    <option value="em_quizes">Quizes</option>
                </select>
            </div>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição ou Pergunta</th>
                        <th>Resposta</th>
                        <th>URL</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabela_objetos">
                    <!-- Objetos aqui-->
                </tbody>
            </table>
        `;
        selectSection(listagem);
    }

    // Atualiza o conteúdo do card
    card.innerHTML = content;

    // Adiciona eventos de clique aos botões "submit" após o conteúdo ter sido adicionado ao DOM
    if (tela === "sorte_ou_azar") {
        content = `
            <h1>Sorte ou Azar</h1>
                <label for="sorte_ou_azar_descricao">Descrição</label>
                <textarea id="sorte_ou_azar_descricao" maxlength="255" rows="3" cols="50"></textarea>
                <label for="file_sorte_ou_azar">Imagem</label>
                <input type="file" id="file_sorte_ou_azar" accept="image/*">
                <button type="submit" id="submit_sorte_ou_azar">Enviar</button>
        `;
        selectSection(_s1);
    }
    // Atualiza o conteúdo do card
    card.innerHTML = content;

    // Adiciona eventos de clique aos botões "submit" após o conteúdo ter sido adicionado ao DOM
    if (tela === "sorte_ou_azar") {
        document.getElementById('submit_sorte_ou_azar').addEventListener('click', async () => {
            let descricao = document.getElementById("sorte_ou_azar_descricao").value;
            let fileInput = document.getElementById("file_sorte_ou_azar");
            let file = fileInput.files[0];

            if (!descricao || !file) {
                alert("Por favor, preencha a descrição e selecione um arquivo.");
                return;
            }

            try {
                let formData = new FormData();
                formData.append("descricao", descricao);
                formData.append("arquivo", file);

                let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/intra/sorte_ou_azar`, {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    alert("Dados enviados com sucesso!");
                    document.getElementById("sorte_ou_azar_descricao").value = '';
                    fileInput.value = ''; // Limpa o campo de arquivo
                } else {
                    let errorData = await response.json();
                    console.error("Erro ao enviar dados:", errorData);
                    alert("Erro ao enviar dados: " + errorData.message);
                }
            } catch (error) {
                console.log(`Error: ${error}`);
                alert(`Error: ${error}`);
            }
        });
    } else if (tela === "consequencias") {
        document.getElementById('submit_zona_de_perigo').addEventListener('click', async () => {
            let descricao = document.getElementById("zona_de_perigo_descricao").value;
            let fileInput = document.getElementById("file_zona_de_perigo");
            let file = fileInput.files[0];

            if (!descricao || !file) {
                alert("Por favor, preencha a descrição e selecione um arquivo.");
                return;
            }

            try {
                let formData = new FormData();
                formData.append("descricao", descricao);
                formData.append("arquivo", file);

                let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/intra/consequencia`, {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    alert("Dados enviados com sucesso!");
                    document.getElementById("zona_de_perigo_descricao").value = '';
                    fileInput.value = ''; // Limpa o campo de arquivo
                } else {
                    let errorData = await response.json();
                    console.error("Erro ao enviar dados:", errorData);
                    alert("Erro ao enviar dados: " + errorData.message);
                }
            } catch (error) {
                console.log(`Error: ${error}`);
                alert(`Error: ${error}`);
            }
        });
    } else if (tela === "curiosidades") {
        document.getElementById('submit_curiosidade').addEventListener('click', async () => {
            let descricao = document.getElementById("curiosidade_descricao").value;
            let fileInput = document.getElementById("file_curiosidade");
            let file = fileInput.files[0];

            if (!descricao || !file) {
                alert("Por favor, preencha a descrição e selecione um arquivo.");
                return;
            }

            try {
                let formData = new FormData();
                formData.append("descricao", descricao);
                formData.append("arquivo", file);

                let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/intra/curiosidade`, {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    alert("Dados enviados com sucesso!");
                    document.getElementById("curiosidade_descricao").value = '';
                    fileInput.value = ''; // Limpa o campo de arquivo
                } else {
                    let errorData = await response.json();
                    console.error("Erro ao enviar dados:", errorData);
                    alert("Erro ao enviar dados: " + errorData.message);
                }
            } catch (error) {
                console.log(`Error: ${error}`);
                alert(`Error: ${error}`);
            }
        });
    } else if (tela === "quizes") {
        document.getElementById('submit_quizes').addEventListener('click', async () => {
            let pergunta = document.getElementById("quiz_per").value;
            let resposta = document.getElementById("quiz_res").value;
            let fileInput = document.getElementById("file_quiz");
            let file = fileInput.files[0];

            if (!resposta || !pergunta || !file) {
                alert("Por favor, preencha a pergunta, reposta e selecione um arquivo.");
                return;
            }

            try {
                let formData = new FormData();
                formData.append("pergunta", pergunta);
                formData.append("resposta", resposta);
                formData.append("arquivo", file);

                let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/intra/quiz`, {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    alert("Dados enviados com sucesso!");
                    document.getElementById("quiz_per").value = '';
                    document.getElementById("quiz_res").value = '';
                    fileInput.value = ''; // Limpa o campo de arquivo
                } else {
                    let errorData = await response.json();
                    console.error("Erro ao enviar dados:", errorData);
                    alert("Erro ao enviar dados: " + errorData.message);
                }
            } catch (error) {
                console.log(`Error: ${error}`);
                alert(`Error: ${error}`);
            }
        });
    }

    // Adiciona o evento ao filtro após o conteúdo ter sido adicionado ao DOM
    if (tela === "list") {
        let filterElement = document.getElementById('filter');
        if (filterElement) {
            filterElement.addEventListener('change', async (event) => {
                let selectedValue = event.target.value;

                if (selectedValue) {
                    let endpoint;
                    switch (selectedValue) {
                        case "em_sorte_ou_azar":
                            endpoint = "/api/sorte_ou_azar";
                            break;
                        case "em_zona_de_perigo":
                            endpoint = "/api/consequencia";
                            break;
                        case "em_curiosidade":
                            endpoint = "/api/curiosidade";
                            break;
                        case "em_quizes":
                            endpoint = "/api/quiz";
                            break;
                        default:
                            return;
                    }

                    try {
                        let response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com${endpoint}`);
                        let data = await response.json();
                        let temp_tb;

                        if (endpoint === "/api/sorte_ou_azar") {
                            temp_tb = "sorte_ou_azar"
                        } else if (endpoint === "/api/consequencia") {
                            temp_tb = "consequencia"
                        } else if (endpoint === "/api/curiosidade") {
                            temp_tb = "curiosidade"
                        } else if (endpoint === "/api/quiz") {
                            temp_tb = "quiz"
                        }

                        if (response.ok) {
                            let tabelaObjetos = document.getElementById('tabela_objetos');
                            tabelaObjetos.innerHTML = ""; // Limpa a tabela antes de preencher com novos dados
                            
                            data.forEach(item => {
                                let row = document.createElement('tr');

                                row.innerHTML = `
                                    <td style="text-align: center;">${item.id || 'N/A'}</td>
                                    <td>${item.descricao || item.pergunta || 'N/A'}</td>
                                    <td>${item.resposta || 'N/A'}</td>
                                    <td>${item.url || 'N/A'}</td>
                                    <td>${selectedValue.replace('em_', '').replace('_', ' ')}</td>
                                    <td>
                                        <button class="btn btn-edit">Editar</button>
                                        <button class="btn btn-delete">Excluir</button>
                                    </td>
                                `;
                                tabelaObjetos.appendChild(row);
                            });

                            addEditEventListeners(temp_tb)
                            addDeleteEventListeners(temp_tb); // Adiciona os eventos de exclusão
                        } else {
                            console.error("Erro ao buscar dados:", data.error);
                        }
                    } catch (error) {
                        console.error("Erro na requisição:", error);
                    }
                }
            });
        } else {
            console.error("Elemento com id 'filter' não encontrado.");
        }
    }
}
