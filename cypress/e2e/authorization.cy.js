import * as data from "../helpers/default_data.json";
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Авторизация', function () {

   beforeEach('Открыть страницу', function () {
         cy.visit('/');
    });

   it('1. Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.close).should('be.visible');
    })

    it('2. Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_page.email).type(data.login);
        cy.get(recovery_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.close).should('be.visible');
    })

    it('3. Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password.slice(1));  //Обрезаем верный пароль, чтобы получить неверный
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.close).should('be.visible');
    })

    it('4. Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login.slice(1)); //Обрезаем верный логин, чтобы получить неверный
        cy.get(main_page.password).type(data.password); 
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.close).should('be.visible');
    })

    it('5. Логин без @ и верный пароль', function () {
        cy.get(main_page.email).type(data.login.replace(/@/g, '')); //Удаляем @ из логина
        cy.get(main_page.password).type(data.password); 
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

    it('6. Логин с заглавными буквами и верный пароль', function () {
        cy.get(main_page.email).type(data.login_uppercase);
        cy.get(main_page.password).type(data.password); 
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.close).should('be.visible');
    })   
})