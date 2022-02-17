/* eslint-disable no-undef */
import { cleanup, findAllByText, fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';

const COLUMN_ROLE_SELECTOR = 'columnheader';
const ROW_ROLE_SELECTOR = 'row';

import App from './App';
import mockedData from './mockedData';





const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => {
      return Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockedData)
    })});
}


describe('1 - Fazer uma requisição para API de tasks e renderiza as tasks corretamente', () => {
  beforeEach(cleanup);
  beforeEach(mockFetch)

  it('Faz a requisição para a API', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Preencha a tabela com as tasks', async () => {
    await act(async () => {
      render(<App />);
    });
    const tasks = mockedData;
    for(let taskIndex in tasks) {
      const name = await screen.findByText(tasks[taskIndex].name);
      const task = await screen.findAllByText(tasks[taskIndex].task);
      const date = await screen.findAllByText(tasks[taskIndex].date);
      const status = await screen.findAllByText(tasks[taskIndex].status);
      

      expect(name).toBeInTheDocument();
      expect(task.length).toBeGreaterThanOrEqual(1);
      expect(date.length).toBeGreaterThanOrEqual(1);
      expect(status.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('Verifique se a tabela tem 5 colunas', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findAllByRole(COLUMN_ROLE_SELECTOR)).toHaveLength(5);
  });

  it('Verifique se a tabela tem uma linha para cada task retornada', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(5);
  });
  

  it('Verifique botões de ação', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findAllByText('⇅')).toHaveLength(4);
    const [nameButton] = await screen.findAllByText('⇅');
    fireEvent.click(nameButton)
    expect(await screen.findAllByText('Naruto')).toBeInTheDocument
  });
});