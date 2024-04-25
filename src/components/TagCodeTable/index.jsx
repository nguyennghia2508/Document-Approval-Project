import React from 'react';
import "./style.scss"

const TagCodeTable = ({
    handleFieldSetup,
    document,
    listSigner,
}) => {
    const urlBE = "https://localhost:44389"

    const handClick = (e, mode, name) => {
        handleFieldSetup(mode, name);
    };

    return (
        <div className="section-table-tag-code">
            <table className="table table-bordered table-tag-code">
                <thead>
                    <tr>
                        <th>Tag code</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span
                                className="draggable"
                                draggable
                                value="[{RequestCode}]"
                                onClick={(e) => handClick(e, "Textbox", "[{RequestCode}]", "null")}
                            >
                                {document?.RequestCode}
                            </span>
                        </td>
                        <td>Mã request</td>
                    </tr>
                    <tr>
                        <td>
                            <span
                                className="draggable"
                                draggable
                                value="[{Title}]"
                                onClick={(e) => handClick(e, "Textbox", "[{Title}]", "null")}
                            >
                                {document?.Subject}
                            </span>
                        </td>
                        <td>Tiêu đề</td>
                    </tr>
                    {listSigner && listSigner.length > 0 && listSigner.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>
                                    <span
                                        className="draggable"
                                        draggable
                                        value="[{SignerName1}]"
                                        onClick={(e) => handClick(e, "Textbox", `[{SignedDate${item.ApprovalPerson.Index}}]`)}
                                    >
                                        {`[{SignedDate${item.ApprovalPerson.Index}}]`}
                                    </span>
                                </td>
                                <td>Thời gian ký {item.ApprovalPerson.Index}</td>
                            </tr>
                            {item.SignaturePath &&
                                <tr>
                                    <td>
                                        <span
                                            className="draggable"
                                            style={{
                                                height: "50px",
                                                display: "flex",
                                                backgroundColor: "pink",
                                                backgroundImage: item.SignaturePath && `url(${urlBE}/${item.SignaturePath})`,
                                                backgroundPosition: "center center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "contain",
                                            }}
                                            onClick={(e) => handClick(e, "SignatureField", `[{Signature${item.ApprovalPerson.Index}}]`)}
                                        >
                                        </span>
                                    </td>
                                    <td>Người ký {item.ApprovalPerson.Index}</td>
                                </tr>
                            }
                            <tr>
                                <td>
                                    <span
                                        className="draggable"
                                        draggable
                                        value="[{SignerName1}]"
                                        onClick={(e) => handClick(e, "Textbox", `[{SignerName${item.ApprovalPerson.Index}}]`)}
                                    >
                                        {item.ApprovalPerson.ApprovalPersonName}
                                    </span>
                                </td>
                                <td>Tên người ký {item.ApprovalPerson.Index}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default TagCodeTable;
