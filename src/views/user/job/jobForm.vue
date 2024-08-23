<template>
    <div class="pt-60 pb-120 mt-n2 bg-color">
        <div class="container">
            <div class="justify-content-center">
                <div class="row justify-content-center">
                    <div class="col">
                        <div class="form-wrap login-form-wrap style--two form-border">
                            <center><h2>{{ this.translate('jobForm') }}</h2></center>
                                &nbsp;
                                &nbsp;
                            <form @submit.prevent="submitOTP" >
                                <div class="tab" v-show="currentTab === 0">
                                    <input type="hidden" v-model="tab[0].inputValue">
                            <div v-if="currentTab === 0">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group  mb-20">
                                                <center><h3 class="deYsAp">{{ this.translate('headingLable') }}</h3></center>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group mb-20">
                                            <label for="title" class="mb-2 semi-bold title-color">{{ this.translate('heading') }} <span style="color: red;">*</span></label>
                                            <input type="text"  :class="{ 'form-control': true, 'is-invalid': v$.form.title.$errors.length > 0 }" v-model="v$.form.title.$model" id="title" class="form-control"  placeholder="Brief explanation of the assignment" >
                                                <div class="input-errors" v-for="(error, index) of v$.form.title.$errors" :key="index">
                                                    <div class="error-msg">{{ error.$message }}</div>
                                                </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-12">
                                        <div class="form-group mb-20">
                                            <label for="title" class="mb-2 semi-bold title-color">{{ this.translate('description') }} <span style="color: red;">*</span></label>
                                            <textarea :class="{ 'form-control': true, 'is-invalid': v$.form.description.$errors.length > 0 }" v-model="v$.form.description.$model"  cols="30" rows="20" placeholder="A good description of the assignment makes it easier for companies to give a good answer." ></textarea>
                                                <div class="input-errors" v-for="(error, index) of v$.form.description.$errors" :key="index">
                                                    <div class="error-msg">{{ error.$message }}</div>
                                                </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group  mb-20">
                                                <label for="l_name" class="mb-2 semi-bold title-color">{{ this.translate('category') }} <span style="color: red;">*</span></label>
                                                    <div class="custom-select c1">
                                                            <select  @change="fetchSubCategory($event)" v-model="selectedCategoryId" class="form-control">
                                                                    <option disabled>Choose category from dropdown</option>
                                                                    <option v-for="cat in categories.data" :value="cat.id" :selected="this.selectedCategoryId === cat.id">{{ cat.name }}</option>
                                                            </select>
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6"  >
                                            <div class="form-group mb-20" v-if="showSubCategorySelect==true">
                                                <label for="l_name" class="mb-2 semi-bold title-color">{{ this.translate('subCategory') }}</label>
                                                <div class="custom-select c1">
                                                    <select name="" id=""  class="form-control"  v-model="selectedSubCategoryId">
                                                            <option value="">Choose Subcategory from dropdown</option>
                                                            <option v-for="subCat in subCategories.data" :value="subCat.id">{{ subCat.name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                                <div class="tab" v-show="currentTab === 1">
                                    <input v-model="tab[1].inputValue" class="form-controle" type="hidden">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group  mb-20">
                                                <center><h3 class="deYsAp">{{ this.translate('nameLable') }}</h3></center>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <div class="form-group mb-20">
                                                <label for="name" class="mb-2 semi-bold title-color">{{ this.translate('name') }} <span style="color: red;">*</span></label>       
                                                <input type="text" id="name" :class="{ 'form-control': true, 'is-invalid': v$.form.name.$errors.length > 0 }" v-model="v$.form.name.$model" placeholder="Name" >
                                                    <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                                                        <div class="error-msg">{{ error.$message }}</div>
                                                    </div>
                                            
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group mb-20">
                                                <label for="email" class="mb-2 semi-bold title-color">{{ this.translate('email') }}</label>
                                                <input type="text" id="email" :class="{ 'form-control': true, 'is-invalid': v$.form.email.$errors.length > 0 }" v-model="v$.form.email.$model" placeholder="Email">
                                                    <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                                                        <div class="error-msg">{{ error.$message }}</div>
                                                    </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group mb-20">
                                                <label for="phone" class="mb-2 semi-bold title-color">{{ this.translate('phone') }} <span style="color: red;">*</span></label>
                                                <input type="tel" :placeholder="this.translate('phone')" maxlength="11" id="phone" :class="{ 'form-control': true, 'is-invalid': v$.form.phone.$errors.length > 0 }" @input="this.filterNumbers" v-model="v$.form.phone.$model"  >
                                                    <div class="input-errors" v-for="(error, index) of v$.form.phone.$errors" :key="index">
                                                        <div class="error-msg">{{ error.$message }}</div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group mb-20">
                                                <label for="city" class="mb-2 semi-bold title-color">{{ this.translate('city') }} <span style="color: red;">*</span></label>
                                                <select id="city" :class="{ 'form-control': true, 'is-invalid': v$.form.city.$errors.length > 0 }" v-model="v$.form.city.$model">
                                                    <option value="" selected disabled>{{ this.translate('city') }}</option>
                                                    <option value="Rawalpindi">Rawalpindi</option>
                                                    <option value="Islamabad">Islamabad</option>
                                                    <option value="Lahore">Lahore</option>
                                                    <option value="Karachi">Karachi</option>
                                                </select>  
                                                <div class="input-errors" v-for="(error, index) of v$.form.city.$errors" :key="index">
                                                    <div class="error-msg">{{ error.$message }}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12">
                                            <div class="form-group mb-20">
                                                <label for="address" class="mb-2 semi-bold title-color">{{ this.translate('address') }} <span style="color: red;">*</span></label>
                                                <input type="text" id="address" class="form-control" placeholder="address" :class="{ 'form-control': true, 'is-invalid': v$.form.address.$errors.length > 0 }" v-model="v$.form.address.$model">
                                                    <div class="input-errors" v-for="(error, index) of v$.form.address.$errors" :key="index">
                                                        <div class="error-msg">{{ error.$message }}</div>
                                                    </div>
                                            </div>
                                        </div>

                                        

                                    </div>
                                </div>
                                <div class="tab" v-show="currentTab === 2">
                                    <input v-model="tab[2].inputValue" class="form-controle" type="hidden">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group  mb-20">
                                                <center><h3 class="deYsAp">{{ this.translate('jobQuestuionLable') }}</h3></center>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group mb-20">
                                                <label for="s_date" class="mb-2 semi-bold title-color">{{ this.translate('jobQuestuion1') }}</label>
                                                <select   v-model="form.s_date" class="form-control">
                                                        <option value="" Asselected disabled>Choose dropdown</option>
                                                        <option value="any time">Any Time</option>
                                                        <option value="As soon as possible">As soon as possible</option>
                                                </select>
                                            
                                            </div>
                                        </div>
                                        <div class="col-lg-6" >
                                            <div class="form-group mb-20">
                                                <label for="cost" class="mb-2 semi-bold title-color">{{ this.translate('jobQuestuion2') }}</label>
                                                <input type="text" id="cost" class="form-control" placeholder="Estimated Cost" v-model="form.cost">
                                            
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6">{{ images }}
                                            <div class="form-group mb-20">
                                                <label for="s_date" class="mb-2 semi-bold title-color" >Add 3 images</label>
                                                <input type="file" class="form-control" id="imageInput2"  @change="onFileChange" multiple="3">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-md-3 g-4 image-gallery" v-for="(image, key) in images" :key="key">
                                            <div class="col image${i}">
                                                <div class="card h-100">
                                                        <img :ref="'image'" class="card-img-top"/>
                                                    <div class="card-footer">
                                                        <button type="button" class="delete-btn form-control  text-center" @click="deleteImage(key)">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                   
                                </div>

                                <div class="tab" v-show="currentTab === 3">
                                    <input v-model="tab[3].inputValue" class="form-controle" type="hidden">
                                    <center>
                                    <div class="sc-hIqOWS eZIWtP">
                                        <p color="black.black9" font-size="1" class="sc-blLsxD jKdusN">
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">{{ this.translate('optMsg') }}</font>
                                            </font>
                                        </p>
                                    </div>
                                    </center>
                                    <div display="flex" class="sc-jTrPJq jVupeX" style="gap: 10px;" v-if="otpSent">
                                        <h4 class="sc-hAtEyd dmdLyc">
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">{{ this.translate('enterCode') }}</font>
                                            </font>
                                        </h4>
                                        <div data-testid="123" class="sc-4b8f1322-0 eJcBdw">
                                            <input v-for="(input, index) in inputs" :key="index" ref="inputRefs" :data-testid="'123-input-' + index" type="tel"  @input="handleInput(index)" maxlength="1" autocomplete="one-time-code" class="sc-4b8f1322-1 TDIDl" v-model="inputs[index]">
                                        </div>
                                        <!-- <button :disabled="isButtonDisabled" type="button" class="sc-irTswW iRzsxL" @click="verify">
                                            <span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ this.translate('verify') }}</font></font></span>
                                        </button> -->
                                        <button type="button" class="sc-irTswW cgDvLR">
                                            <span>
                                                <font style="vertical-align: inherit;">
                                                    <font style="vertical-align: inherit;" :disabled="isButtonDisabled" @click="sendOtp">{{ this.translate('resendCode') }}</font>
                                                </font>
                                            </span>
                                        </button>
                                    </div>

                                    <br>
                                    <br>
                                    <center>
                                        <button class="btn btn-success" @click="prevTab">{{ this.translate('prev') }}</button>&nbsp
                                        <button v-if="!isLoading" type="submit"
                                                        class="btn btn-success"
                                                        :disabled="isButtonDisabled"  >
                                                    <span>{{ this.translate('submit') }}</span>
                                        </button>
                                        <button class="btn btn-success" disabled v-if="isLoading">
                                            <span>Loading...</span>
                                        </button>
                                    </center>

                                </div>
                                    <center>
                                        <div v-show="currentTab != 3">
                                            <button type="button" class="btn btn-success"  :disabled="prewBtn" @click="prevTab">{{ this.translate('prev') }}</button>&nbsp
                                            <button type="button" class="btn btn-success btnNext" :disabled="isNextButtonDisabled" :class="'length' + currentTab " @click="nextTab">{{ currentTab === steps.length - 1 ? '' : this.translate('next') }}</button>
                                        </div>
                                    </center>
                                    <div>
                                </div>
                            </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>

    import axios from 'axios';
    import swal from 'sweetalert';
    import useVuelidate from '@vuelidate/core'
    import { required, email } from '@vuelidate/validators'

    export default {

        setup () {
            return { v$: useVuelidate() }
        },

        mounted() {

            if(this.$route.query.param=='cat'){
                localStorage.removeItem('formHeading');
            }

            axios.get(this.$service+'category')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error(error);
                });

                const phoneInputField = document.querySelector("#phone");
                const phoneInput = window.intlTelInput(phoneInputField, {
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                    initialCountry: "pk",
                });

                const element = document.querySelector('.iti--allow-dropdown');
                element.style.display = 'block';
                element.style.color = 'black';

        },

        computed: {
            isNextButtonDisabled() {
                if (this.currentTab === 0) {
                    $('.image-gallery').empty();
                    this.prewBtn=true;
                    if (this.form.title && this.form.title.length>0 && this.form.description && this.form.description.length>0  && this.selectedCategoryId!=null) {
                        return false;
                    }
                
                }

                if (this.currentTab === 1) {
                    this.prewBtn=false;
                    if(this.form.name.length>0 && this.form.phone.length>0 && this.form.address.length>0 && this.form.city.length>0 ){
                        return false;
                    }
                }

                if (this.currentTab === 2) {
                    this.prewBtn=false;
                    if(this.form.name.length>0 && this.form.phone.length>0 && this.form.address.length>0 && this.form.city.length>0 ){
                        return false;
                    }
                }
                return true;
            },

            concatenatedValues() {
                return this.inputs.join('');
            },

            isButtonDisabled() {
                return this.concatenatedValues.length >6;
            },
        },

        beforeCreate(){
            if(this.$route.query.param=='cat'){
                    localStorage.removeItem('formHeading');
                }
        },

        created() {

                this.fetchUserInfo();
                // set selected category ID from query parameter if it exists
                    const selectedCat = JSON.parse(localStorage.getItem('typeFromHeading'));
                    if(selectedCat) {
                        
                        if(selectedCat.type==='category'){
                            this.selectedCategoryId = selectedCat.id;
                            this.fetchSubCategory('',selectedCat.id,'cat');
                        }
                        else if(selectedCat.type==='sub_category')
                        {
                            this.selectedSubCategoryId = selectedCat.id;
                        }
                    }

                    if (this.$route.query.cat) {
                        if(this.$route.query.param=='cat'){
                            
                            this.selectedCategoryId = parseInt(this.$route.query.cat);
                            this.fetchSubCategory('',this.$route.query.cat,'cat');
                        }
                        else{
                            const parameters = { subCat_id: this.$route.query.cat, };
                            axios.post(this.$service+'category_Id',parameters)
                            .then(response => {
                                this.selectedCategoryId = response.data.data.category_id;
                            })
                            .catch(error => {
                                console.error(error);
                            });
                            this.fetchSubCategory('',this.$route.query.cat,'cat');
                            this.selectedSubCategoryId = parseInt(this.$route.query.cat);
                        }
                    }
                // fetch categories from API or elsewhere and set to this.categories
                },

        watch: {
                inputs: {
                    handler(newInputs) {
                        const nonEmptyCount = newInputs.filter(value => value !== '').length;
                        this.isButtonDisabled = nonEmptyCount !== 6;
                    },
                    deep: true,
                },
        },

        data() {

            return {
                        inputs: ['', '', '', '', '', ''],
                        isButtonDisabled: true,
                        selectedCategoryId:null,
                        selectedSubCategoryId:null,
                        categories: [],
                        subCategories: [],  
                        showSubCategorySelect:true, 
                        phoneNumber: '',
                        verificationId: '',
                        verificationCode: '',
                        confirmationResult: null,
                        otpSent: false,
                        form: {
                                title: (localStorage.getItem('formHeading')!=''?localStorage.getItem('formHeading'):''),
                                description:'',
                                name: '',
                                email: '',
                                phone: '',
                                address: '',
                                city: '',
                                s_date: '',
                                cost: '',
                                category: '',
                                sub_category: '',
                                confirmPassword: '',
                            },  
                        otpIs:'',    
                        currentTab: 0,
                        prewBtn:true,
                        steps: ['Step 1', 'Step 2', 'Step 3','Step 4'],
                        tab: [
                        { inputValue: '', valid: false },
                        { inputValue: '', valid: false },
                        { inputValue: '', valid: false },
                        { inputValue: '', valid: false },
                        ],
                        isLoading: false,
                        images:[]
            }

        },

        validations() {

                    return {

                        form: {
                            
                            title: {  required },
                            description: {  required },
                            name: {  required },
                            email: {  email },
                            phone: {  required },
                            city: {  required },
                            address: {  required },
                            
                        },
                    }
            },


        methods: {

               
                deleteImage(index) {
                    // $(button).parent('.image-container').remove();
                    this.images.splice(index,1)
                    this.refreshImg();

                },

                handleInput(index) {
                        // Move focus to the next input element if a digit is entered
                        const inputElements = this.$refs.inputRefs;
                        const currentInput = inputElements[index];
                        if (/\d/.test(currentInput.value) && index < inputElements.length - 1) {
                            inputElements[index + 1].focus();
                        }
                },

                handlePaste(event, index) {
                    // Prevent the default paste behavior
                    event.preventDefault();

                    // Get the pasted text
                    const pastedText = event.clipboardData.getData('text');

                    // Update the input value
                    const currentInput = this.$refs.inputRefs[index];
                    currentInput.value = pastedText;

                    // Move focus to the next input element if necessary
                    if (index < this.$refs.inputRefs.length - 1) {
                        this.$refs.inputRefs[index + 1].focus();
                    }
                },

                prevTab() {
                    if (this.currentTab > 0) {
                        this.currentTab--;
                    }
                },

                nextTab() {
                    if(this.currentTab==2){
                        this.otpSent = true;
                        this.sendOtp();
                    }
                    if (this.currentTab < this.steps.length - 1) {
                        this.currentTab++;
                    } else {
                        this.submitForm();
                    }
                },

                sendOtp(){

                        const phoneInputField = document.querySelector("#phone");
                        const phoneInput = window.intlTelInputGlobals.getInstance(phoneInputField);
                        const phoneNumber = phoneInput.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL);

                        const parameters = {
                            phone: phoneNumber,
                            email: this.form.email,
                        };
                        axios.post(this.$authentication+'send_job_otp',parameters)
                            .then(response => {
                                if(response.data.status==200){
                                    this.otpIs=response.data.otp
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                },

                submitOTP() {
                            this.isLoading = true;
                           
                            const values = this.concatenatedValues;
                            if(values==this.otpIs){
                                this.postJob();
                            }else{
                                this.isLoading = false;
                                swal("Oops!",'Otp not matched', "error");
                            }
                },

                fetchSubCategory(event='',cat=''){

                                    let parameters = {};

                                    if(cat!=''){
                                        parameters = {  id: cat, };
                                    }
                                    else{
                                        parameters = { id: event.target.value, };
                                    }

                                    axios.post(this.$service+'subCategory',parameters)
                                    .then(response => {
                                        if(response.data.status==200){
                                            this.subCategories = response.data;
                                            this.showSubCategorySelect=true;
                                        }
                                        else{
                                            this.showSubCategorySelect=false;
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    });

                },

                async postJob() {
                                    this.isLoggedIn = localStorage.getItem('accessToken') !== null;
                                    this.userId = localStorage.getItem('user');
                                    const user = JSON.parse(this.userId);

                                    const phoneInputField = document.querySelector("#phone");
                                    const phoneInput = window.intlTelInputGlobals.getInstance(phoneInputField);
                                    const phoneNumber = phoneInput.getNumber();

                                    let formData = new FormData();
                                    formData.append('user_id',  (user?user.user_id:'0'));
                                    formData.append('email', this.form.email);
                                    formData.append('title', this.form.title);
                                    formData.append('name', this.form.name);
                                    formData.append('address', this.form.address);
                                    formData.append('city', this.form.city);
                                    formData.append('job_start', this.form.s_date);
                                    formData.append('your_cost', this.form.cost);
                                    formData.append('category', this.selectedCategoryId);
                                    formData.append('phone', phoneNumber);
                                    formData.append('sub_category',  this.selectedSubCategoryId);
                                    formData.append('signupmethod',"email");
                                    formData.append('description', this.form.description);

                                    this.images.forEach((img, index) => {
                                        formData.append(`image${index}`, img.dataUrl);
                                    });

                                            axios.post(this.$service+'post_job',formData)
                                                .then(response => {

                                                    setTimeout(function () {
                                                        $('.spinner-container').hide();
                                                    }, 1000);

                                                    if (this.isLoggedIn) {

                                                        if(response.data.status==200){

                                                            swal("Job Posted Successfully!", "" ,"success");
                                                            localStorage.removeItem('formHeading');
                                                            localStorage.removeItem('typeFromHeading');
                                                            this.$router.push({name:"JobList"});
                                                        }

                                                        if(response.data.status==400){
                                                            swal("Oops!", response.data.message, "error");
                                                        }
                                                    }else{
                                                        this.$router.push({name:"JobPosted"});
                                                    }

                                                })
                                                .catch(error => {
                                                        console.log(error)
                                                });
                                
                },

                async fetchUserInfo() {

                    this.isLoggedIn = localStorage.getItem('user');

                    if(this.isLoggedIn!=null){

                        const data = JSON.parse(this.isLoggedIn);

                        const user_id = data.id; // Access the status property

                        const parameters = {
                            id: user_id,
                        };

                        axios.post(this.$authentication+'user_info',parameters)
                        .then(response => {
                            if(response.data.status==200){
                                this.info =  response.data.user
                                this.form.email =  this.info.email
                                this.form.phone =  this.info.phone_no
                                this.form.name =   this.info.name
                                this.form.address =this.info.address
                            }
                            if(response.data.status==400){
                                swal("Oops!", response.data.message, "error");
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    }
                },

                emptyImagesInputs(){
                    var newInput = document.createElement('input');
                    newInput.type = 'file';
                    newInput.className = 'form-control';
                    newInput.id = 'imageInput';
                    newInput.multiple = true;

                    var oldInput = document.getElementById('imageInput');
                    oldInput.parentNode.replaceChild(newInput, oldInput);
                },
                // image upload
                onFileChange(e) {
                    const vm = this;
                    const selectedFiles = e.target.files;
                    if(selectedFiles.length>3) {
                        swal("Oops!",`Select up to 3 files only`, "error");
                        e.target.value = null
                        return false
                    }
                    for (let i = 0; i < selectedFiles.length; i++) {
                        console.log(selectedFiles[i]);
                        this.images.push(selectedFiles[i]);
                    }

                    for (let i = 0; i < this.images.length; i++) {
                        let reader = new FileReader();
                    reader.onload = (e) => {
                        this.$refs.image[i].src = reader.result;

                        console.log(this.$refs.image[i].src);
                        };

                        reader.readAsDataURL(this.images[i]);
                    }
                },

                refreshImg() {
                    for (let i = 0; i < this.images.length; i++) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                        this.$refs.image[i].src = reader.result;
                        };
                        reader.readAsDataURL(this.images[i]);
                    }
                }
                            
        }
    };


  </script>

<style>
    .error-msg{
        color:red;
    }

    @media only screen and (max-width: 600px) {
        .margin2 {
            margin-right: auto;
        }
        .margin_bt {
            margin-bottom: 20px;
        }
        .remember {
            font-size: 20px;
        }
        .label_size {
            font-size: 20px;
        }
    }

    .eyeBtn{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0.47rem 0.75rem;
        margin-bottom: 0;
        font-size: .8125rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        text-align: center;
        white-space: nowrap;
        background-color: #eff2f7;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;height:56px
    }
    .nextBtn{
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: 100%;
        position: relative;
        font-weight: 500;
        text-align: center;
        user-select: none;
        padding: 15px 47px;
        border-radius: 0px;
        transition: all 150ms ease-in-out 0s;
        background-color: rgb(57, 96, 191);
        color: rgb(255, 255, 255);
        border: none;
        margin-left: 0px;
        font-size: 18px;
    }
    .bCDtea{
        text-align: center;
        margin-bottom: 20px;
    }
    .eEtiQo {
        margin: 0px 0px 30px;
        font-weight: 400;
        display: block;
        text-align: center;
        color: rgb(16, 31, 65);
        font-size: 17px;
        line-height: 1.5;
    }

    .eMUhjc {
        margin: 0px 0px 15px;
        line-height: 1.25;
        font-size: 17px;
        font-weight: 700;
        text-align: center;
    }

    .jVupeX {
        display: flex;
        margin-top: 15px;
        flex-direction: column;
    }

    .eZIWtP {
        font-family: "Euclid Fireball", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        margin: 5px 0px;
        padding: 7px 10px;
        border-radius: 0px;
        color: rgb(9, 19, 42);
        font-size: 15px;
        background: rgb(206, 242, 238);
    }

    .eJcBdw {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        gap: 10px;
    }

    .dmdLyc {
        margin: 0px 0px 10px;
        font-size: 17px;
        font-weight: 600;
        line-height: 1.25;
        text-align: center;
    }
    .TDIDl {
        width: 30px;
        height: 40px;
        font-size: 24px;
        text-align: center;
        background-color: rgb(245, 246, 247);
        border: 1px solid rgb(207, 210, 217);
        border-radius: 1px;
        padding: 0px;
    }

    .iRzsxL:disabled, .iRzsxL:disabled:hover {
        background-color: rgb(231, 233, 236);
        color: rgb(183, 188, 198);
        border: none;
        text-decoration: none;
        cursor: not-allowed;
    }

    .iRzsxL {
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: auto;
        position: relative;
        font-weight: 500;
        text-align: center;
        user-select: none;
        padding: 15px 47px;
        border-radius: 0px;
        transition: all 150ms ease-in-out 0s;
        font-size: 15px;
        background-color: rgb(57, 96, 191);
        color: rgb(255, 255, 255);
        border: none;
        margin: 7px auto;
    }

    .gsLvdx:disabled, .gsLvdx:disabled:hover {
        background-color: rgb(231, 233, 236);
        color: rgb(183, 188, 198);
        border: none;
        text-decoration: none;
        cursor: not-allowed;
    }

    .gsLvdx {
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: 100%;
        position: relative;
        font-weight: 500;
        text-align: center;
        user-select: none;
        padding: 15px 47px;
        border-radius: 0px;
        transition: all 150ms ease-in-out 0s;
        background-color: rgb(57, 96, 191);
        color: rgb(255, 255, 255);
        border: none;
        margin-left: 0px;
        font-size: 18px;
    }

    @media screen and (min-width: 376px){
        .eMUhjc {
            font-size: 18px;
        }
    }

    @media screen and (min-width: 1200px){
        .eMUhjc {
            font-size: 42px;
        }
    }
</style>
  

  