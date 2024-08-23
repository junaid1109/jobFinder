<template>
    <div class="pt-120 pb-120 mt-n2 bg-color">
     <div class="container">
      <div class="justify-content-center">
       <div class="row justify-content-center">
        <div class="col">
          <div class="form-wrap login-form-wrap style--two form-border">
            <center><h2>Company Registration Form</h2></center>
            &nbsp;
            &nbsp;
         <form @submit.prevent="Signup">
          <div class="row">
              <div class="col-lg-6">
                  <div class="form-group mb-20" >
                      <label for="f_name" class="mb-2 semi-bold title-color">{{ this.translate('name') }} <span style="color: red;">*</span></label>
                      <input type="text" id="name" class="form-control" placeholder="Name" v-model="v$.form.name.$model">
                      <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                          <div class="error-msg">{{ error.$message }}</div>
                      </div>
                  </div>
              </div>
              <div class="col-lg-6">
                  <div class="form-group mb-20" >
                      <label for="city" class="mb-2 semi-bold title-color">{{ this.translate('email') }} <span style="color: red;">*</span></label>
                      <input type="email" id="email" class="form-control" :placeholder="this.translate('email')" v-model="v$.form.email.$model">
                      <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                          <div class="error-msg">{{ error.$message }}</div>
                      </div>
                  </div>
              </div>
                <div class="col-lg-6">
                    <div class="form-group mb-20">
                        <label for="phone" class="mb-2 semi-bold title-color">{{ this.translate('phone') }} <span style="color: red;">*</span></label>
                        <input  id="phone" type="tel" :placeholder="this.translate('phone')" name="phone" class="form-control" maxlength="10" @input="this.filterNumbers"  v-model="v$.form.phone.$model">
                        <div class="input-errors" v-for="(error, index) of v$.form.phone.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="form-group mb-20">
                        <label for="total_employees" class="mb-2 semi-bold title-color">{{ this.translate('totalEmplyee') }}</label>       
                        <input type="number" id="total_employees" class="form-control" :placeholder="this.translate('totalEmplyee')" v-model="this.form.total_employees.$model">
                    </div>
                </div>
              
                <div class="col-lg-6">
                    <div class="form-group mb-20">
                        <label for="address" class="mb-2 semi-bold title-color">{{ this.translate('city') }} <span style="color: red;">*</span></label> 
                        <select id="address" class="form-control" v-model="v$.form.address.$model">
                            <option value="" selected disabled>{{ this.translate('city') }}</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Karachi">Karachi</option>
                        </select>      
                        <div class="input-errors" v-for="(error, index) of v$.form.address.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="form-group mb-20">
                        <label for="l_name" class="mb-2 semi-bold title-color">{{ this.translate('category') }} <span style="color: red;">*</span></label>
                        <select  v-model="v$.form.category.$model" class="form-control">
                                <option value="" selected disabled>Choose category from dropdown</option>
                                <option v-for="cat in categories.data" :value="cat.id">{{ cat.name }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="form-group mb-20">
                        <label for="password" class="mb-2 semi-bold title-color">{{ this.translate('password') }} <span style="color: red;">*</span></label>
                        <div class="input-group">
                            <input type="password" id="password" class="form-control" :placeholder="this.translate('password')" v-model="v$.form.password.$model">
                            <div class="input-group-append" style="margin-left: -1px;display: flex;">
                                <span class="input-group-text eyeBtn" @click="togglePasswordVisibility" >
                                    <i class="fa" :class="{'fa-eye': showPassword, 'fa-eye-slash': !showPassword}" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                        <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                <div class="form-group mb-20">
                    <label for="confirmPassword" class="mb-2 semi-bold title-color">{{ this.translate('confirmPassword') }} <span style="color: red;">*</span></label>
                    <div class="input-group">
                        <input type="password" id="confirmPassword" class="form-control" :placeholder="this.translate('confirmPassword')" v-model="v$.form.confirmPassword.$model">
                        <div class="input-group-append" style="margin-left: -1px;display: flex;">
                            <span class="input-group-text eyeBtn" @click="toggleConfirmPasswordVisibility" >
                                <i class="fa" :class="{'fa-eye': showConfirmPassword, 'fa-eye-slash': !showConfirmPassword}" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="input-errors" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
                        <div class="error-msg" >
                                {{ validationsErrorMessages.form.confirmPassword.sameAs }}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div class="d-flex align-items-center" v-if="!otpSent">
              <button type="submit" class="btn c1-hover btn-border" :disabled="v$.form.$invalid">
                  <span>{{ this.translate('signup') }}</span>
              </button>
          </div>

            <div display="flex" class="sc-jTrPJq jVupeX" style="gap: 10px;" v-if="otpSent">
                <h4 class="sc-hAtEyd dmdLyc">
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">{{ this.translate('enterCode') }}</font>
                    </font>
                </h4>
                <div data-testid="123" class="sc-4b8f1322-0 eJcBdw">
                    <input v-for="(input, index) in inputs" :key="index" ref="inputRefs" :data-testid="'123-input-' + index" type="tel"  @input="handleInput(index)" maxlength="1" autocomplete="one-time-code" class="sc-4b8f1322-1 TDIDl" v-model="inputs[index]">
                </div>
                <button :disabled="isButtonDisabled" type="button" class="sc-irTswW iRzsxL" @click="verify">
                    <span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{ this.translate('verify') }}</font></font></span>
                </button>
                <button type="button" class="sc-irTswW cgDvLR">
                    <span>
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;" :disabled="isButtonDisabled" @click="verify">{{ this.translate('resendCode') }}</font>
                        </font>
                    </span>
                </button>
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
      import { inject } from 'vue'
      import useVuelidate from '@vuelidate/core'
      import { required, email,sameAs } from '@vuelidate/validators'
  
  
      export default {
  
            setup () {

                let cookies = inject('cookies');
                return { v$: useVuelidate() }
    
            },

            mounted() {     
                    const phoneInputField = document.querySelector("#phone");
                    const phoneInput = window.intlTelInput(phoneInputField, {
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                    initialCountry: "pk",
                    });
                    const element = document.querySelector('.iti--allow-dropdown');
                    element.style.display = 'block';
                    axios.get(this.$service+'category')
                        .then(response => {
                            this.categories = response.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });

            },

            computed: {
                validationsErrorMessages() {
                    return {
                        form: {
                                confirmPassword: {
                                    sameAs: 'The Confirm password do not match with password.',
                                },
                            }
                    }
                },
                concatenatedValues() {
                    return this.inputs.join('');
                },
                isButtonDisabled() {
                    // Adjust your condition based on the concatenatedValues
                    return this.concatenatedValues.length >6;
                },
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
                    categories: [],
                    otpSent: false,
                    isButtonDisabled: true,
                    form: {
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        password: '',
                        category: '',
                        confirmPassword: '',
                        total_employees: '',
                    },
                    autocompleteValue: 'off',
                    showPassword:true,
                    showConfirmPassword:true,
    
                }
    
            },
              
            validations() {
  
                            return {
                
                                    form: {
                                        
                                        email: {
                                            required, email 
                                        },
                    
                                        password: {
                                            required, 
                                        },
                    
                                        confirmPassword: {
                                                required,
                                                sameAs: function () {
                                                        const passwordValue = this.form.password;
                                                        const confirmPasswordValue = this.form.confirmPassword;
                                                        if (passwordValue !== confirmPasswordValue) {
                                                            return false;
                                                        }
                                                        return true;
                                                    },
                                        },
                    
                                        name: {
                                            required, 
                                        },
                                        
                                        phone: {
                                            required, 
                                        },
                                        
                                        address: {
                                            required, 
                                        },

                                        category: {
                                            required, 
                                        },
                                    },
                            }
            },

            methods: {

                    async Signup() {
                        this.otpSent = true;   
                        const phoneInputField = document.querySelector("#phone");
                        const phoneInput = window.intlTelInputGlobals.getInstance(phoneInputField);
                        const phoneNumber = phoneInput.getNumber();

                        const parameters = {
                            email: this.form.email,
                            password: this.form.password,
                            confirmPassword: this.form.confirmPassword,
                            name: this.form.name,
                            phone: phoneNumber,
                            location: this.form.address,
                            category: this.form.category,
                            total_employees: this.form.total_employees,
                            signupmethod:"email"
                        };
  
                        axios.post(this.$authentication+'service-provider/signup',parameters)
                            .then(response => {

                                if(response.data.status==200){
                                    // swal(response.data.message, "" ,"success");
                                    // location.href='/login';
                                }
                                if(response.data.status==400){
                                    this.otpSent = false; 
                                    swal("Oops!", response.data.message, "error");
                                }

                            })
                            .catch(error => {
                                console.log(error)
                            });
                    },

                    verify() {
                            const values = this.concatenatedValues;
                            const parameters = {
                                phone: this.form.email,
                                otp:values,
                                userType:'provider'
                            };
                            axios.post(this.$authentication+'verify_otp',parameters)
                                .then(response => {
                                    if(response.data.status==200){
                                        if(response.data.type=='provider'){
                                                window.localStorage.setItem('token',JSON.stringify(response.data.token))
                                                window.localStorage.setItem('provider',JSON.stringify(response.data.data))
                                                window.localStorage.setItem('type',JSON.stringify(response.data.type))
                                                this.$router.push({name:"ProviderHome"});
                                                window.location.reload();
                                            }
                                            else{
                                                window.localStorage.setItem('accessToken',response.data.token)
                                                window.localStorage.setItem('user',JSON.stringify(response.data.data))
                                                window.localStorage.setItem('type',JSON.stringify(response.data.type))
                                                this.$router.push('/userHome');
                                                location.href='/userHome';
                                            }
                                    }
                                    if(response.data.status==404){
                                        swal("Oops!", response.data.message, "error");
                                    }
                                })
                                .catch(error => {
                                console.log(error)
                                });
                            
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

                    togglePasswordVisibility() {
                        const passwordInput = document.getElementById('password');
                        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                        (passwordInput.type=='text'? this.showPassword=false:this.showPassword=true);
                    },

                    toggleConfirmPasswordVisibility() {
                        const passwordInput1 = document.getElementById('confirmPassword');
                        passwordInput1.type = passwordInput1.type === 'password' ? 'text' : 'password';
                        (passwordInput1.type=='text'? this.showConfirmPassword=false:this.showConfirmPassword=true);
                    },
                    
                  }
      }
  
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