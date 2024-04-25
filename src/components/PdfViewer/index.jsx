import React, { useEffect, useState } from 'react';
import '../../index.css';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject,
  TextMarkupAnnotation // Import TextMarkupAnnotation
} from '@syncfusion/ej2-react-pdfviewer';
import fileUploadApi from '../../api/fileUploadApi';
import approvalPersonApi from '../../api/approvalPersonApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TagCodeTable from '../TagCodeTable';
import Loading from '../Loading';
import { Button } from 'antd';

const PDFViewer = () => {

  const navigate = useNavigate()

  const [listToDelete, setListToDelete] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [dataDocument, setDataDocument] = useState(null)
  const [listSigner, setListSigner] = useState([])
  const [queryParams] = useSearchParams();
  const { id } = useParams();
  const documentId = queryParams.get('id');
  const type = queryParams.get('type');
  const [isLoading, setIsLoading] = useState(true);
  const fileName = 'pdf-review.pdf';
  const urlBE = "https://localhost:44389"

  useEffect(() => {
    const fetchFileUpload = async () => {
      try {
        if (documentId) {
          const res = await approvalPersonApi.tagCodeDocument(documentId);
          if (res.state === "true") {
            setDataDocument(res.document)
            setListSigner(res.signers)
          }
        }
      } catch (error) {
        console.log('Error fetching file:', error);
      }
    };

    fetchFileUpload();
  }, [documentId]);

  useEffect(() => {
    setIsLoading(false)
  }, [navigate]);

  function getNewIndex(name) {
    const viewer = document.getElementById('container').ej2_instances[0];
    try {
      const fields_match_name = viewer.formFieldCollections.filter(f => f.name.includes(name));
      if (fields_match_name.length === 0) return 0;
      return Math.max(...fields_match_name.map(f => parseInt(f.name.split('.')[1].replace('}]', '')))) + 1;
    } catch (e) {
      return viewer.formFields.filter(e => e.properties.name.indexOf(name) >= 0).length;
    }
  }

  const handleFormSetup = (mode, name) => {
    const viewer = document.getElementById('container').ej2_instances[0];
    viewer.designerMode = true;
    if (viewer.designerMode) {
      const formDesignerModule = viewer.formDesignerModule;

      viewer.isFormDesignerToolbarVisible = true

      const initNameField = name.replace('[{', '').replace('}]', '')
      const nameField = '[{' + initNameField + '.' + getNewIndex(initNameField) + '}]'

      formDesignerModule.pdfViewer.drawingObject = {
        formFieldAnnotationType: mode,
        name: nameField,
        fontFamily: "Times New Roman",
        fontSize: 11,
        fontStyle: 'None',
        color: 'black',
        backgroundColor: '#daeaf7ff',
        thickness: 1,
        borderColor: '#303030',
        alignment: 'center',
        isReadonly: false,
        visibility: "visible",
        isRequired: false,
        isPrint: true,
        rotateAngle: 0,
        tooltip: '',
        font: {
          isItalic: false,
          isBold: true,
          isStrikeout: false,
          isUnderline: false
        }
      };
      formDesignerModule.pdfViewer.tool = "DrawTool";
      formDesignerModule.isSetFormFieldMode = true;
    }
  };


  const handleAdd = (e) => {
    const formField = e.field;
    if (formField) {
      const formFieldNameElement = document.getElementById(`${formField.id}_designer_name`)
      const name = formField.name.replace('[{', '').replace('}]', '');
      var label;
      if (name.includes("RequestCode")) {
        label = dataDocument.RequestCode
        // } else if (name.includes("SignerJobTitle")) {
        //   label =
      } else if (name.includes("Title")) {
        label = dataDocument.Subject
      }
      else if (name.includes("Signature")) {

        label = formField.name

        const formFieldObject = document.getElementById(`${formField.id}_content_html_element`).children[0]
        formFieldObject.style.backgroundImage = `url(${urlBE}/${listSigner[parseInt(name.substring(0, name.lastIndexOf('.')).replace('Signature', '')) - 1].SignaturePath})`
        formFieldObject.style.backgroundPosition = "center center"
        formFieldObject.style.backgroundRepeat = "no-repeat"
        formFieldObject.style.backgroundSize = "contain"

        formFieldNameElement.style.backgroundImage = `url(${urlBE}/${listSigner[parseInt(name.substring(0, name.lastIndexOf('.')).replace('Signature', '')) - 1].SignaturePath})`
        formFieldNameElement.style.backgroundPosition = "center center"
        formFieldNameElement.style.backgroundRepeat = "no-repeat"
        formFieldNameElement.style.backgroundSize = "contain"
        formFieldNameElement.style.color = "transparent"

      }
      else if (name.includes("SignerName")) {
        label = listSigner[parseInt(name.substring(0, name.lastIndexOf('.')).replace('SignerName', '')) - 1].ApprovalPerson.ApprovalPersonName;
      }
      else {
        label = formField.name
      }
      formFieldNameElement.innerHTML = label
    }
  };

  const handleAjaxRequestInitiate = (args) => {
    const viewer = document.getElementById('container').ej2_instances[0];

    if (viewer.serverActionSettings.load == "Load") {
      args.JsonData['documenApprovaltId'] = documentId;
      args.JsonData['fileId'] = id;
      viewer.setJsonData(args.JsonData);
    }
  };

  const handleSave = () => {
    const viewer = document.getElementById('container').ej2_instances[0];
    viewer.saveAsBlob("pdf").then(function (blob) {
      var fileReader = new FileReader();

      fileReader.onload = async function () {
        var base64Text = ";base64,";
        var documentData = {
          fileId: id,
          fileName: fileName,
          documentApprovalId: documentId,
          documentData: fileReader.result.substring(fileReader.result.indexOf(base64Text) + base64Text.length),
          isDelete: isDelete
        }
        const res = await fileUploadApi.saveFileUpload(documentData);
        if (res.state === "true") {
          navigate(`/avn/documentapproval/edit/${dataDocument?.Id}`)
        }
      }
      fileReader.readAsDataURL(blob);
    })
  };

  const handleRemoveFormField = (e) => {
    const viewer = document.getElementById('container').ej2_instances[0];
    const initList = viewer.formFieldsModule.formFieldsData;

    if (initList && initList.length > 0) {
      const fieldsToDelete = initList.find(item => {
        const key = item?.Key;
        if (key) {
          return e.field.id === key.split('_')[0];
        }
      });

      if (fieldsToDelete) {
        setListToDelete(prevListToDelete => [...prevListToDelete, fieldsToDelete.Key.split('_')[0]]);
      }
    }

  };


  const handleLoading = (e) => {
    if (e.documentName) {
      const viewer = document.getElementById('container').ej2_instances[0];
      const initFields = viewer.formFieldCollections
      if (initFields.length) {
        initFields.map(f => {
          // var input = document.querySelector(`input[id="${f.id}"]`)
          // let idx = input.name.replace('[{', '').replace('}]', '')
          // listSigner.map((signer, index) => {
          //   if (parseInt(idx.substring(0, idx.lastIndexOf('.')).replace('SignerName', '')) - 1 === index) {
          //     if (signer.IsSign) {
          //       input.style.backgroundColor = "transparent"
          //     }
          //     else {
          //       input.style.backgroundColor = "red"
          //     }
          //   }
          // })

          document.getElementById(`${f.id}_designer_name`).style.display = "none"
        })
      }
      setIsLoading(false)
    }
  };

  const handleUnload = (e) => {
    console.log(e)
  };

  useEffect(() => {
    const viewer = document.getElementById('container')?.ej2_instances[0];
    const initList = viewer?.formFieldsModule.formFieldsData;
    if (listToDelete.length === initList?.length) {
      setIsDelete(true)
    }
  }, [listToDelete])

  return (
    <>
      {isLoading ? <Loading /> :
        <div>
          <div className='control-section' style={{ display: "flex", marginTop: "20px" }}>
            <PdfViewerComponent
              id="container"
              documentPath={fileName}
              formFieldAdd={handleAdd}
              name={fileName}
              documentUnload={handleUnload}
              documentLoad={handleLoading}
              ajaxRequestInitiate={handleAjaxRequestInitiate}
              formFieldRemove={handleRemoveFormField}
              enableDownload={true}
              serviceUrl={urlBE + '/api/pdf-viewers'}
              style={{ flex: 3, height: "100vh" }}>
              {/* Inject the required services */}
              <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView,
                ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner]} />
            </PdfViewerComponent>
            <div style={{ flex: 1 }}>
              <TagCodeTable
                handleFieldSetup={handleFormSetup}
                document={dataDocument}
                listSigner={listSigner}
              />
            </div>
            <Button
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      }
    </>
  );
};

export default PDFViewer;