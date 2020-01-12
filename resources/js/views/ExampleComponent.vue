<template>
    <div >
        <div >
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Productos</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" class="form-control" v-model="name">

                        <label>Descripción</label>
                        <input type="text" class="form-control" v-model="description">

                        <label>Contenido</label>
                        <input type="text" class="form-control" v-model="content">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary"  @click="saveTasks()">Agregar</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
            </button>
            <div class="col-md-12">
                <h2>PRODUCTOS</h2>
                <table class="table text-center"><!--Creamos una tabla que mostrará todas las tareas-->
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Contenido</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in arrayTasks" :key="task.id"> <!--Recorremos el array y cargamos nuestra tabla-->
                                <td v-text="task.name"></td>
                                <td v-text="task.description"></td>
                                <td v-text="task.content"></td>
                                <td>
                                    <!--Botón modificar, que carga los datos del formulario con la tarea seleccionada-->
                                    <button class="btn" @click="loadFieldsUpdate(task)">Modificar</button>
                                    <!--Botón que borra la tarea que seleccionemos-->
                                    <button class="btn" @click="deleteTask(task)">Borrar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Productos',
        data(){
            return{
                name:"", //Esta variable, mediante v-model esta relacionada con el input del formulario
                description:"", //Esta variable, mediante v-model esta relacionada con el input del formulario
                content:"", //Esta variable, mediante v-model esta relacionada con el input del formulario
                update:0, /*Esta variable contrarolará cuando es una nueva tarea o una modificación, si es 0 significará que no hemos seleccionado
                          ninguna tarea, pero si es diferente de 0 entonces tendrá el id de la tarea y no mostrará el boton guardar sino el modificar*/
                arrayTasks:[], //Este array contendrá las tareas de nuestra bd
            }
        },
        methods:{
            getTasks(){
                let me =this;
                let url = '/tareas' //Ruta que hemos creado para que nos devuelva todas las tareas
                axios.get(url).then(function (response) {
                    //creamos un array y guardamos el contenido que nos devuelve el response
                    me.arrayTasks = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            },
            saveTasks(){
                let me =this;
                let url = '/tareas/guardar' //Ruta que hemos creado para enviar una tarea y guardarla
                axios.post(url,{ //estas variables son las que enviaremos para que crear la tarea
                    'name':this.name,
                    'description':this.description,
                    'content':this.content,
                }).then(function (response) {
                    me.getTasks();//llamamos al metodo getTask(); para que refresque nuestro array y muestro los nuevos datos
                    me.clearFields();//Limpiamos los campos e inicializamos la variable update a 0
                    $("#exampleModal").modal("toggle");
                    console.log(111111);
                })
                .catch(function (error) {
                    console.log(error);
                });   
                
            },
            updateTasks(){/*Esta funcion, es igual que la anterior, solo que tambien envia la variable update que contiene el id de la
                tarea que queremos modificar*/
                let me = this;
                axios.put('/tareas/actualizar',{
                    'id':this.update,
                    'name':this.name,
                    'description':this.description,
                    'content':this.content,
                }).then(function (response) {
                   me.getTasks();//llamamos al metodo getTask(); para que refresque nuestro array y muestro los nuevos datos
                   me.clearFields();//Limpiamos los campos e inicializamos la variable update a 0
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){ //Esta función rellena los campos y la variable update, con la tarea que queremos modificar
                this.update = data.id
                let me =this;
                let url = '/tareas/buscar?id='+this.update;
                axios.get(url).then(function (response) {
                    me.name= response.data.name;
                    me.description= response.data.description;
                    me.content= response.data.content;
                    
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                }); 
            },
            deleteTask(data){//Esta nos abrirá un alert de javascript y si aceptamos borrará la tarea que hemos elegido
                let me =this;
                let task_id = data.id
                if (confirm('¿Seguro que deseas borrar esta tarea?')) {
                    axios.delete('/tareas/borrar/'+task_id
                    ).then(function (response) {
                        me.getTasks();
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
                }
            },
            clearFields(){/*Limpia los campos e inicializa la variable update a 0*/
                this.name = "";
                this.description = "";
                this.content = "";
                this.update = 0;
            }
        },
        mounted() {
           this.getTasks();
        }
    }
</script>
