import React from "react";
import { useLocation } from "react-router-dom";

// import css
import GoodsDetailMainStyle from './GoodsDetailMain.module.css';

const GoodsDetailMain = () => {

    // 사용자가 선택한 상품 정보
    const goodsInfo = useLocation().state.data;

    return (
        <div className={GoodsDetailMainStyle['goods-detail-wrap']}>
            <div className={`container text-center ${GoodsDetailMainStyle['goods-detail-layout']}`}>

                <div className={`container ${GoodsDetailMainStyle['goods-detail-header']}`}>
                    <div></div>
                    <div></div>
                </div> {/* //. goods-detail-header */}

                <div className={`container ${GoodsDetailMainStyle['goods-detail-container']}`}>

                </div> {/* //. goods-detail-container */}

                <div className={`container ${GoodsDetailMainStyle['goods-detail-footer']}`}>
                    <div className={GoodsDetailMainStyle['footer-delivery-info']}>
                        <h6 className={GoodsDetailMainStyle['footer-title']}>배송정보</h6>
                        <table className={`table table-bordered ${GoodsDetailMainStyle['footer-table']}`}>
                                <tbody>
                                    <tr>
                                        <th>배송방법</th>
                                        <td>순차배송</td>
                                        <th rowSpan={2}>배송비</th>
                                        <td rowSpan={2}>
                                            <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                                5,000원<br/>
                                                - 40,000원 이상 구매 시 무료배송<br/>
                                                · 도서산간의 경우 추가 배송비가 발생할 수 있습니다.
                                            </pre>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>배송사</th>
                                        <td>CJ대한통운</td>
                                    </tr>

                                    <tr>
                                        <th>묶음배송 여부</th>
                                        <td colSpan={4}>가능</td>
                                    </tr>

                                    <tr>
                                        <th>배송기간</th>
                                        <td colSpan={4}>
                                            <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                                도서산간 지역 등은 배송에 3-5일이 더 소요될 수 있습니다. <br/>
                                                - 천재지변, 물량 수급 변동 등 예외적인 사유 발생 시, 다소 지연될 수 있는 점 양해 부탁드립니다.
                                            </pre>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div> {/* //. footer-delivery-info */}

                    <div className={GoodsDetailMainStyle['footer-exchange-info']}>
                        <h6 className={GoodsDetailMainStyle['footer-title']}>교환/반품 안내</h6>
                        <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                            ㆍ교환/반품에 관한 일반적인 사항은 판매자가 제시사항보다 관계법령이 우선합니다. <br/>
                            다만, 판매자의 제시사항이 관계법령보다 소비자에게 유리한 경우에는 판매자 제시사항이 적용됩니다.
                        </pre>
                        <table className={`table table-bordered ${GoodsDetailMainStyle['footer-table']}`}>
                            <tbody>
                                <tr>
                                    <th>교환/반품 비용</th>
                                    <td>
                                        <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                            4,000원 <br/>
                                            - 단, 고객 변심의 경우에만 발생 <br/>
                                            - 도서산간 및 일부 지역 추가비용 발생 <br/>
                                            - 부분반품 시, 남은금액이 무료배송 조건을 유지하면 편도 배송비용만 부과
                                        </pre>
                                    </td>
                                </tr>
                                <tr>
                                    <th>교환/반품 신청 기준일</th>
                                    <td>
                                        <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                        ㆍ단순변심에 의한 교환/반품은 제품 수령 후 7일 이내까지, 교환/반품 제한사항에 해당하지 않는 경우에만 가능 <br/>
                                        (배송비용과 교환/반품 비용 왕복배송비 고객부담) <br/>
                                        ㆍ상품의 내용이 표시·광고의 내용과 다른 경우에는 상품을 수령한 날부터 3개월 이내, <br/>
                                        그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 가능
                                        </pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> {/* //. footer-exchange-info */}

                    <div className={GoodsDetailMainStyle['footer-exchange-restriction']}>
                        <h6 className={GoodsDetailMainStyle['footer-title']}>교환/반품 제한사항</h6>
                        <ul className={GoodsDetailMainStyle['footer-ul']}>
                            <li>ㆍ주문/제작 상품의 경우, 상품의 제작이 이미 진행된 경우</li>
                            <li>ㆍ상품 포장을 개봉하여 사용 또는 설치 완료되어 상품의 가치가 훼손된 경우 (단, 내용 확인을 위한 포장 개봉의 경우는 예외)</li>
                            <li>ㆍ고객의 사용, 시간경과, 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
                            <li>ㆍ세트상품 일부 사용, 구성품을 분실하였거나 취급 부주의로 인한 파손/고장/오염으로 재판매 불가한 경우</li>
                            <li>ㆍ모니터 해상도의 차이로 인해 색상이나 이미지가 실제와 달라, 고객이 단순 변심으로 교환/반품을 무료로 요청하는 경우</li>
                            <li>ㆍ제조사의 사정 (신모델 출시 등) 및 부품 가격 변동 등에 의해 무료 교환/반품으로 요청하는 경우</li>
                        </ul>
                    </div> {/* //. footer-exchange-restriction */}

                </div> {/* //. goods-detail-footer */}

            </div> {/* //. goods-detail-layout */}
        </div> // .goods-detail-wrap
    )
};

export default GoodsDetailMain;