const path = require('path')
const expect = require('chai').expect
const locale = (lang="en") => require(`../../../src/locales/${lang}.json`)
import {describe, it} from '../utils/mochaw'

const options = {
  pageObjects: ['DocumentSelection', 'Welcome', 'DocumentUpload', 'DocumentUploadConfirmation']
}

const localhostUrl = 'https://localhost:8080/'

describe('Happy Paths', options, ({driver, pageObjects}) => {
  const {documentSelection, welcome, documentUpload, documentUploadConfirmation} = pageObjects

  describe('welcome screen', function () {

    const copy = locale("en")
    const welcomeLocale = copy["welcome"]

    it('should verify website title', async () => {
       driver.get(localhostUrl)
      const title = driver.getTitle()
      expect(title).to.equal('Onfido SDK Demo')
    })

    it('should display welcome screen title', async () => {
      const welcomeTitleText = welcome.welcomeTitle.getText()
      expect(welcomeTitleText).to.equal(welcomeLocale["title"])
      welcome.welcomeTitle.isDisplayed()
    })

    it('should display welcome screen subtitle', async () => {
      const welcomeSubtitleText = welcome.welcomeSubtitle.getText()
      expect(welcomeSubtitleText).to.equal(welcomeLocale["description_p_1"] + "\n" + welcomeLocale["description_p_2"])
      welcome.welcomeSubtitle.isDisplayed()
    })

    it('should display verify identity button', async () => {
      const verifyIdentityBtnText = welcome.primaryBtn.getText()
      expect(verifyIdentityBtnText).to.equal(welcomeLocale["next_button"])
      welcome.primaryBtn.isDisplayed()
    })

    it('should display footer', async () => {
      welcome.footer.isDisplayed()
    })
  })

  //Document selection screen
  describe('document selection screen', function () {
  const copy = locale("en")
  const documentSelectionLocale = copy

  it('test document selection title', async () => {
    driver.get(localhostUrl)
    welcome.primaryBtn.click()
    const documentSelectionTitleText = documentSelection.title.getText()
    expect(documentSelectionTitleText).to.equal(documentSelectionLocale["document_selector"]["identity"]["title"])
    documentSelection.title.isDisplayed()
  })

  it('test document selection subtitle', async () => {
    const documentSelectionSubtitleText = documentSelection.subtitle.getText()
    expect(documentSelectionSubtitleText).to.equal(documentSelectionLocale["document_selector"]["identity"]["hint"])
    documentSelection.subtitle.isDisplayed()
  })

    it('should display passport icon', async () => {
      documentSelection.passportIcon.isDisplayed()
    })

  it('test passport label', async () => {
    const documentSelectionPassportLabelText = documentSelection.documentSelectionLabel.getText()
    expect(documentSelectionPassportLabelText).to.equal(documentSelectionLocale["passport"])
    documentSelection.documentSelectionLabel.isDisplayed()
  })

  it('test passport hint', async () => {
    const documentSelectionPassportHintText = documentSelection.documentSelectionHint.getText()
    expect(documentSelectionPassportHintText).to.equal(documentSelectionLocale["document_selector"]["identity"]["passport_hint"])
    documentSelection.documentSelectionHint.isDisplayed()
  })

    it('should display driving licence icon', async () => {
      documentSelection.drivingLicenceIcon.isDisplayed()
    })

  it('test driving licence label', async () => {
    const drivingLicenceLabelText = documentSelection.drivingLicenceLabel.getText()
    expect(drivingLicenceLabelText).to.equal(documentSelectionLocale["driving_licence"])
    documentSelection.drivingLicenceLabel.isDisplayed()
  })

  it('test driving licence hint', async () => {
    const drivingLicenceHintText = documentSelection.drivingLicenceHint.getText()
    expect(drivingLicenceHintText).to.equal(documentSelectionLocale["document_selector"]["identity"]["driving_licence_hint"])
    documentSelection.drivingLicenceHint.isDisplayed()
  })

    it('should display identity card icon', async () => {
      documentSelection.identityCardIcon.isDisplayed()
    })

  it('test identity card label', async () => {
    const identityCardLabelText = documentSelection.identityCardLabel.getText()
    expect(identityCardLabelText).to.equal(documentSelectionLocale["national_identity_card"])
    documentSelection.identityCardLabel.isDisplayed()
  })

  it('test identity card hint', async () => {
    const identityCardHintText = documentSelection.identityCardHint.getText()
    expect(identityCardHintText).to.equal(documentSelectionLocale["document_selector"]["identity"]["national_identity_card_hint"])
    documentSelection.identityCardHint.isDisplayed()
  })

  //Document upload screen
  describe('document upload screen', function () {
  const copyDocumentUploadCrossDevice = documentUpload.copyDocumentUploadCrossDevice()
  const copyDocumentUpload = documentUpload.copyDocumentUpload()

    it('should display cross device icon', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.passportIcon.click()
      documentUpload.crossDeviceIcon.isDisplayed()
    })

    it('should display cross device header', async () => {
      const crossDeviceHeaderText = documentUpload.crossDeviceHeader.getText()
      expect(crossDeviceHeaderText).to.equal(copyDocumentUploadCrossDevice["header"])
      documentUpload.crossDeviceHeader.isDisplayed()
    })

    it('should display cross device submessage', async () => {
      const crossDeviceSubMessageText = documentUpload.crossDeviceSubMessage.getText()
      expect(crossDeviceSubMessageText).to.equal(copyDocumentUploadCrossDevice["submessage"])
      documentUpload.crossDeviceSubMessage.isDisplayed()
    })

    it('should display cross device arrow presence', async () => {
      documentUpload.crossDeviceArrow.isDisplayed()
    })

    it('should display uploader icon presence', async () => {
      documentUpload.uploaderIcon.isDisplayed()
    })

    it('should display uploader instruction', async () => {
      const uploaderInstructionsMessageText = documentUpload.uploaderInstructionsMessage.getText()
      expect(uploaderInstructionsMessageText).to.equal(copyDocumentUpload["instructions"])
      documentUpload.uploaderInstructionsMessage.isDisplayed()
    })

    it('should display uploader button', async () => {
      const uploaderBtnText = documentUpload.uploaderBtn.getText()
      expect(uploaderBtnText).to.equal('Upload file')
      documentUpload.uploaderBtn.isDisplayed()
    })

    it('should upload a passport and verify UI elements', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.passportIcon.click()
      const passportTitleText =  documentUpload.title.getText()
      expect(passportTitleText).to.equal('Passport photo page')
      documentUpload.title.isDisplayed()
      const passportInstructionMessage = documentUpload.uploaderInstructionsMessage.getText()
      expect(passportInstructionMessage).to.equal('Upload passport photo page from your computer')
      documentUpload.uploaderInstructionsMessage.isDisplayed()
      const input = documentUpload.getUploadInput()
      input.sendKeys(path.join(__dirname, '../../features/helpers/resources/passport.jpg'))
      const waitForPassportUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      const checkReadabilityText = documentUpload.title.getText()
      expect(checkReadabilityText).to.equal('Check readability')
      const makeSureClearDetailsMessage = documentUploadConfirmation.makeSureClearDetailsMessage.getText()
      expect(makeSureClearDetailsMessage).to.equal('Make sure your passport details are clear to read, with no blur or glare')
      documentUploadConfirmation.makeSureClearDetailsMessage.isDisplayed()
    })

    it('should upload driving licence and verify UI elemetns', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.drivingLicenceIcon.click()
      const frontOfDrivingLicenceTitle = documentUpload.title.getText()
      documentUpload.title.isDisplayed()
      expect(frontOfDrivingLicenceTitle).to.equal('Front of driver\'s license')
      const frontOfDrivingLicenceInstructionMessage = documentUpload.uploaderInstructionsMessage.getText()
      expect(frontOfDrivingLicenceInstructionMessage).to.equal('Upload front of license from your computer')
      documentUpload.uploaderInstructionsMessage.isDisplayed()
      const uploadFront = documentUpload.getUploadInput()
      uploadFront.sendKeys(path.join(__dirname,'../../features/helpers/resources/uk_driving_licence.png'))
      const waitForFrontUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      documentUploadConfirmation.confirmBtn.click()
      const backOfDrivingLicenceTitle = documentUpload.title.getText()
      expect(backOfDrivingLicenceTitle).to.equal('Back of driver\'s license')
      const backOfDrivingLicenceInstructionMessage = documentUpload.uploaderInstructionsMessage.getText()
      expect(backOfDrivingLicenceInstructionMessage).to.equal('Upload back of license from your computer')
      documentUpload.uploaderInstructionsMessage.isDisplayed()
      const uploadBack = documentUpload.getUploadInput()
      uploadBack.sendKeys(path.join(__dirname,'../../features/helpers/resources/back_driving_licence.jpg'))
      const waitForBackUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      const checkReadabilityText = documentUpload.title.getText()
      expect(checkReadabilityText).to.equal('Check readability')
      documentUpload.title.isDisplayed()
      const makeSureClearDetailsMessage = documentUploadConfirmation.makeSureClearDetailsMessage.getText()
      expect(makeSureClearDetailsMessage).to.equal('Make sure your license details are clear to read, with no blur or glare')
      documentUploadConfirmation.makeSureClearDetailsMessage.isDisplayed()
    })

    it('should upload identity card and verify UI elemetns', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.identityCardIcon.click()
      const frontOfIdentityCardTitle = documentUpload.title.getText()
      expect(frontOfIdentityCardTitle).to.equal('Front of identity card')
      documentUpload.title.isDisplayed()
      const frontOfIdentityCardInstructionMessage = documentUpload.uploaderInstructionsMessage.getText()
      expect(frontOfIdentityCardInstructionMessage).to.equal('Upload front of card from your computer')
      documentUpload.uploaderInstructionsMessage.isDisplayed()
      const uploadFront = documentUpload.getUploadInput()
      uploadFront.sendKeys(path.join(__dirname,'../../features/helpers/resources/national_identity_card.jpg'))
      const waitForFrontUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      documentUploadConfirmation.confirmBtn.click()
      const backOfIdentityCardTitle = documentUpload.title.getText()
      expect(backOfIdentityCardTitle).to.equal('Back of identity card')
      const backOfIdentityCardInstructionMessage = documentUpload.uploaderInstructionsMessage.getText()
      expect(backOfIdentityCardInstructionMessage).to.equal('Upload back of card from your computer')
      documentUpload.uploaderInstructionsMessage.isDisplayed()
      const uploadBack = documentUpload.getUploadInput()
      uploadBack.sendKeys(path.join(__dirname,'../../features/helpers/resources/back_national_identity_card.jpg'))
      const waitForBackUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      const checkReadabilityText = documentUpload.title.getText()
      expect(checkReadabilityText).to.equal('Check readability')
      documentUpload.title.isDisplayed()
      const makeSureClearDetailsMessage = documentUploadConfirmation.makeSureClearDetailsMessage.getText()
      expect(makeSureClearDetailsMessage).to.equal('Make sure your card details are clear to read, with no blur or glare')
      documentUploadConfirmation.makeSureClearDetailsMessage.isDisplayed()
    })

    it('should return no document message after uploading non-doc image', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.passportIcon.click()
      const input = documentUpload.getUploadInput()
      input.sendKeys(path.join(__dirname, '../../features/helpers/resources/llama.pdf'))
      const waitForBackUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      documentUploadConfirmation.confirmBtn.click()
      const errorTitleText = documentUploadConfirmation.errorTitleText.getText()
      expect(errorTitleText).to.equal('No document detected')
      documentUploadConfirmation.errorTitleText.isDisplayed()
      documentUploadConfirmation.errorTitleIcon.isDisplayed()
      const errorInstruction = documentUploadConfirmation.errorInstruction.getText()
      expect(errorInstruction).to.equal('Make sure all the document is in the photo')
      documentUploadConfirmation.errorInstruction.isDisplayed()
    })

    it('should upload a document after retrying', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.passportIcon.click()
      const inputImg = documentUpload.getUploadInput()
      inputImg.sendKeys(path.join(__dirname, '../../features/helpers/resources/llama.pdf'))
      const waitForBackUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      documentUploadConfirmation.confirmBtn.click()
      const waitForImageUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      documentUploadConfirmation.redoBtn.click()
      const input = documentUpload.getUploadInput()
      input.sendKeys(path.join(__dirname, '../../features/helpers/resources/passport.jpg'))
      const waitForPassportUploadToFinish = documentUploadConfirmation.waitForUploadToFinish
      const checkReadabilityText = documentUpload.title.getText()
      expect(checkReadabilityText).to.equal('Check readability')
    })

    it('should return file size too large message', async () => {
      driver.get(localhostUrl)
      welcome.primaryBtn.click()
      documentSelection.passportIcon.click()
      const inputMultipleFaces = documentUpload.getUploadInput()
      inputMultipleFaces.sendKeys(path.join(__dirname, '../../features/helpers/resources/over_10mb_face.jpg'))
      const uploaderError = documentUpload.uploaderError.getText()
      expect(uploaderError).to.equal('File size too large. Size needs to be smaller than 10MB.')
      documentUpload.uploaderError.isDisplayed()
    })
  })
})
