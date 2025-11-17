import React from 'react';
import FAQItem from '../components/FAQItem'; 
import Header from '../components/Header';
import Footer from '../components/Footer';


const faqData = [
  { id: 1, question: "會員加入辦法", answer: "請點選位於首頁右上方的【註冊】並填寫會員基本資料" },
  { id: 2, question: "購票流程說明", answer: "會員登入→選擇活動→點選立即購票→選擇欲購買的票種及張數→選擇付款及取票方式→確認交易成功訂單" },
  { id: 3, question: "取票方式說明", answer: "【電子票券】於付款完成後，本系統會產生專屬於這筆訂單中每張票券的電子票券QR Code，可於【訂單查詢】中查看。電子票券的QR Code請勿任意截圖轉傳，以免遭有心人士惡意使用，影響自身權益。" },
  { id: 4, question: "退票方式說明", answer: "退票申請送出後，恕無法修改退票張數及取消退票申請，請務必於退票申請送出前，確認退票資料是否正確。" },
  { id: 5, question: "換票方式說明", answer: "換票等同於退票，請將原先購買的票券辦理退票，再另行購買。每個節目的退票方案不同，請詳閱您購買節目的【退票說明】。" },
  { id: 6, question: "票券遺失可以補發嗎？", answer: "票券視同有價證券，如有遺失、破損、燒毀或無法辨識等情形，恕不補發，請務必妥善保管票券。遺失、破損、燒毀或無法辨識等情形之入場機制，將依藝文表演票券定型化契約應記載及不得記載事項之應記載事項第七條辦理，詳情請洽本系統客服。" },
];

const FAQList = () => {
  return (
    <>
      <Header showSearchBar={true} /> 
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg">
        
        {/* 標題區塊 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-red-500 pb-2 inline-block">
          常見問題
        </h1>

        {/* 渲染常見問題列表 */}
        <div className="space-y-0">
          {faqData.map((item) => (
            <FAQItem 
              key={item.id} 
              question={item.question} 
              answer={item.answer} 
            />
          ))}
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default FAQList;