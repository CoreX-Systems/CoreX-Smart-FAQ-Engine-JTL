<script>
(function() {
    const crp_gallery = document.querySelector('.product-gallery-inner');
    const crp_desc = document.querySelector('.product-description') || document.querySelector('#tab-description');
    const crp_id = document.querySelector('input[name="a"]')?.value || window.location.pathname;
    const crp_title = "Smart-FAQ";
    
    if (!crp_gallery || !crp_desc || !crp_id) return;

    const crp_api = 'DEINE_URL.de/api/faq-engine.php';

    fetch(crp_api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'id=' + encodeURIComponent(crp_id) + '&desc=' + encodeURIComponent(crp_desc.innerText.substring(0, 1800))
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            crp_gallery.style.position = 'relative';
            crp_gallery.style.paddingBottom = '250px'; 

            let faqWrapper = document.createElement('div');
            faqWrapper.id = 'crp-absolute-footer';
            faqWrapper.style.cssText = 'position: absolute; bottom: 0; left: 0; width: 100%; padding: 10px 0; box-sizing: border-box; z-index: 999;';
            
            let html = `
                <div style="font-size: 13px; font-weight: 800; color: #303030; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.8px; padding-left: 10px;">
                    ✨ ${crp_title}
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 10px; align-items: stretch; padding: 0 5px;">`;
            
            data.forEach((item, index) => {
                html += `
                <div style="flex: 1; display: flex;">
                    <button type="button" 
                            style="width: 100%; background: #f7f7f7; color: #303030; border: 1px solid #ddd; border-radius: 30px; padding: 10px 15px; font-size: 11px; font-weight: 700; cursor: pointer; min-height: 60px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.2; font-family: sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.2s;"
                            onmouseover="this.style.background='#eeeeee'; this.style.transform='translateY(-2px)';"
                            onmouseout="this.style.background='#f7f7f7'; this.style.transform='translateY(0)';"
                            onclick="const allA = document.querySelectorAll('.crp-a-box'); const myA = document.getElementById('crp-box-${index}'); const isVis = myA.style.display === 'block'; allA.forEach(a => a.style.display = 'none'); myA.style.display = isVis ? 'none' : 'block';">
                        <span style="display: block; width: 100%;">${item.f}</span>
                    </button>
                </div>`;
            });

            html += '</div>';

            data.forEach((item, index) => {
                html += `
                <div id="crp-box-${index}" class="crp-a-box" style="display: none; background: #fff; border: 1.5px solid #303030; padding: 18px; border-radius: 15px; font-size: 15px; color: #303030; line-height: 1.6; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-top: 10px; position: relative; z-index: 1000; font-family: sans-serif;">
                    <strong style="display: block; color: #303030; border-bottom: 1px solid #f7f7f7; margin-bottom: 10px; padding-bottom: 5px; font-size: 13px; text-transform: uppercase;">Antwort:</strong>
                    ${item.a}
                </div>`;
            });

            faqWrapper.innerHTML = html;
            crp_gallery.appendChild(faqWrapper);
        }
    })
    .catch(err => {});
})();
</script>
