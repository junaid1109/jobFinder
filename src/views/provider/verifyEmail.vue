<template>
   
    <section class="pt-120 bg-center" :style="{ backgroundImage: 'url(' + this.$main + 'assets/img/bg/about-bg.png)' }">
       <div class="container">
            <h2 v-if="loading" class="btn btn-success">Loading....</h2>

            <div v-else class="row mb-70">
                <div class="col-lg-6">
                    <div class="about-content mb-5 mb-lg-0">
                    <h2>Thank You!</h2>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-right-content">
                        <p style="margin: 0;">Your email is verified at <span style="font-weight: bold;">Notenion</span>. To access further details and updates, please log in to our platform.</p>
                    </div>
                </div>
            </div>
        
       </div>
    </section>
    
</template>

<script>
        import axios from 'axios';
        export default {
    
            setup () {
               
            },
    
            data() {
                return {
                    loading:true,                    
                };
            },
    
            created() {
                    this.verify()
                },

            methods: {
    
                    verify() {
                            const parameters = {
                                token: this.$route.params.id
                            };
                            axios.post(this.$authentication+'verify-email',parameters)
                                .then(response => {
                                    if(response.data.status==200){
                                        swal("Successfully!", response.data.message, "success");
                                    }
                                    else{
                                        swal("Oops!", response.data.message, "error");
                                        location.href='/home';
                                    }
                                })
                                .catch(error => {
                                console.error(error);
                                });
                    },
    
                   
    
                },
    
        };
    
    </script>