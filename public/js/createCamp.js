

$('#campaign-submit').on('click', (e) => {
    e.preventDefault();
    async function CreateCampaign(event) {

        const campaign_name = $('#campBuilder')[0].value;
        const user_id = $('#campaign-builder-id')[0].attributes[2].value
    console.log(campaign_name, user_id)
        await fetch(`api/campaigns`, {
            
            method: 'POST',
            body: JSON.stringify({
                campaign_name,
                user_id
            }),
            header: {
                'Content-Type': 'application/json',
            }
        });
    };
    
    CreateCampaign();
    // window.location.href='/profile'
});