const { UserService } = require('../src/userService');

describe('UserService - Suíte de Testes Limpos (Refatorada)', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  test('deve criar um usuário corretamente', () => {
    // Arrange
    const nome = 'Fulano de Tal';
    const email = 'fulano@teste.com';
    const idade = 25;

    // Act
    const usuarioCriado = userService.createUser(nome, email, idade);

    // Assert
    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(nome);
    expect(usuarioCriado.email).toBe(email);
    expect(usuarioCriado.idade).toBe(idade);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('deve buscar um usuário pelo ID corretamente', () => {
    // Arrange
    const usuarioCriado = userService.createUser('Fulano de Tal', 'fulano@teste.com', 25);

    // Act
    const usuarioBuscado = userService.getUserById(usuarioCriado.id);

    // Assert
    expect(usuarioBuscado).toEqual(usuarioCriado);
  });

  test('deve desativar um usuário comum com sucesso', () => {
    // Arrange
    const usuario = userService.createUser('Comum', 'comum@teste.com', 30);

    // Act
    const resultado = userService.deactivateUser(usuario.id);

    // Assert
    expect(resultado).toBe(true);
    expect(userService.getUserById(usuario.id).status).toBe('inativo');
  });

  test('nao deve desativar um usuario administrador', () => {
    // Arrange
    const admin = userService.createUser('Admin', 'admin@teste.com', 40, true);

    // Act
    const resultado = userService.deactivateUser(admin.id);

    // Assert
    expect(resultado).toBe(false);
    expect(userService.getUserById(admin.id).status).toBe('ativo');
  });

  test('deve conter as informacoes essenciais no relatorio de usuarios', () => {
    // Arrange
    userService.createUser('Alice', 'alice@email.com', 28);
    userService.createUser('Bob', 'bob@email.com', 32);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Relatório de Usuários');
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain('ativo');
  });

  test('deve falhar ao criar usuário menor de idade', () => {
    // Arrange
    const nome = 'Menor';
    const email = 'menor@email.com';
    const idade = 17;

    // Act e Assert
    expect(() => {
      userService.createUser(nome, email, idade);
    }).toThrow('O usuário deve ser maior de idade.');
  });

  test('deve retornar mensagem apropriada quando nao ha usuarios', () => {
    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Nenhum usuário cadastrado.');
  });
});