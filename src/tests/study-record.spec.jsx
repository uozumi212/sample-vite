/**
 * @jest-environment jsdom
 */

jest.mock('../style.css', () => ({}));

import { StudyInput } from "../App";
import { getAllStudies, addStudy } from '../utils/supabaseFunction';
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

jest.mock('../utils/supabaseFunction', () => ({
  // getAllStudies: jest.fn().mockResolvedValue([{ id: 1, title: 'React Testing', time: 2 }]),
  getAllStudies: jest.fn().mockResolvedValue([]),
  // addStudy: jest.fn().mockResolvedValue({ id: 2, title: 'Jest Testing', time: 2 }),
  addStudy: jest.fn().mockImplementation(async (newStudy) => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
    return { id: 2, ...newStudy };
  }),
  deleteStudy: jest.fn().mockResolvedValue({}),
}));

// Supabaseクライアントのモック
// jest.mock('@supabase/supabase-js', () => ({
//   createClient: jest.fn(() => ({
//     from: jest.fn(() => ({
//       select: jest.fn().mockResolvedValue({ data: [], error: null }),
//     })),
//   })),
// }));

describe("Study Record", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("タイトル表示されること", async () => {
    // testId(title)を指定して取得
    // await act(async () => {
    //   render(<StudyInput />);
    // });
    render(<StudyInput />);

    // タイトルのテキストを指定して要素を取得
    await waitFor(() => {
      const titleElement = screen.getByTestId("学習記録一覧");
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('新しい学習記録を追加すると記録の数が増える', async () => {
    const user = userEvent.setup();

    // モックの設定
    // getAllStudies.mockResolvedValue([{ id: 1, title: 'React Testing', time: 2 }]);
    getAllStudies.mockResolvedValue([]);
    addStudy.mockResolvedValue({ id: 2, title: 'Jest Testing', time: 3 });


    // await act(async () => {
    //   render(<StudyInput />);
    // });

    render(<StudyInput />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // ラベルのテキストを使用して入力フィールドを取得
    const studyContentInput = screen.getByLabelText('学習内容');
    const studyTimeInput = screen.getByLabelText('学習時間');

    await user.type(studyContentInput, 'Jest Testing');
    await user.type(studyTimeInput, '3');

    console.log('Before click:', studyContentInput.value, studyTimeInput.value);

    const registerButton = screen.getByText('登録');
    await user.click(registerButton);

    // 状態更新を待つ
    // await waitFor(() => {
    //   const newListItem = screen.getByText(/Jest Testing/i);
    //   expect(newListItem).toBeInTheDocument();
    //   // expect(screen.getByText(/Jest Testing/i)).toBeInTheDocument();
    //   // expect(screen.getByText(/3時間/)).toBeInTheDocument();
    // });

    // const listItems = screen.getAllByRole('listitem');
    // expect(listItems.length).toBe(1);

    expect(addStudy).toHaveBeenCalledWith({ title: 'Jest Testing', time: 3});


}, 5000);

  it('学習記録を削除すると記録の数が減る', async () => {
    const { getAllStudies } = require('../utils/supabaseFunction');
    getAllStudies.mockResolvedValueOnce([
      { id: 1, title: 'React', time: 2 },
      { id: 2, title: 'Jest', time: 3 }
    ]);


  // await act(async () => {
  //   render(<StudyInput />)
  // });

  render(<StudyInput />)

  await waitFor(() => {
    expect(screen.getByText(/React/)).toBeInTheDocument();
    expect(screen.getByText(/Jest/)).toBeInTheDocument();
  });

  const initialCount = screen.getAllByRole('listitem').length;
  expect(initialCount).toBe(2);

  // fireEvent.click(screen.getByText('削除'));
  fireEvent.click(screen.getByTestId('delete-button-1'));

  await waitFor(() => {
    expect(screen.queryByText(/React/)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText(/React/)).not.toBeInTheDocument();
    const newCount = screen.getAllByRole('listitem').length;
    expect(newCount).toBe(initialCount - 1);
  });
});

it('空の入力でエラーが表示される', async () => {
  // await act(async () => {
  //   render(<StudyInput />);
  // });

  render(<StudyInput />);
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });


  const registerButton = screen.getByText('登録');
  expect(registerButton).toBeInTheDocument();


    fireEvent.click(registerButton);



  await waitFor(() => {
    expect(screen.getByText(/入力されていない項目があります/i)).toBeInTheDocument();
  });
 });
});
